<template>
	<transition name="fade">
		<div>
			<div class="page-detail">
				<v-header>
					<div class="header">
						<div class="back center" @click="back">
							<i class="icon-arrow-left2"></i>
						</div>
						<div class="title center">
							<h2>{{data.title}}</h2>
						</div>
						<div class="popover center">
							<i>oooo</i>
						</div>
					</div>
				</v-header>
				<div class="content" ref="content">
					<div class="content-wrapper">
						<div class="content-title">
							<div class="title-info">
								<span class="title">{{getTitle}}</span>
								<span class="desc">{{data.title}}</span>
							</div>
						</div>
						<div class="content-author">
							<div class="author-info">
								<div class="avatar">
									<img v-lazy="data.author.avatar_url" width="48" height="48">
								</div>
								<div class="desc">
									<span>作者：{{data.author.loginname}}</span>
									<span>发表时间：{{data.create_at | formateDate}}</span>
									<span>最后回复：{{data.last_reply_at | formateDate}}</span>
									<span>浏览量：{{data.visit_count}}</span>
								</div>
							</div>
						</div>
						<div class="content-collect" v-show="loginname">
							<div class="collect-wrapper">
								<i :class="toggleIcon(data)" class="icon" @click="toggleFavorite"></i>
								<span>{{toggleText(data)}}</span>
							</div>
						</div>
						<div class="content-main">
							<div class="text" v-html="data.content" ref="text"></div>
						</div>
						<div class="content-comments">
							<div class="title">
								<h3>{{data.replies.length}}条评论</h3>
							</div>
							<div class="comments">
								<ul>
									<li class="item" v-for="(item, index) in data.replies" :key="item.id">
										<div class="wrapper">
											<div class="user">
												<div class="avatar">
													<img v-lazy="item.author.avatar_url" width="48" height="48">
												</div>
												<div class="name">
													<span>{{item.author.loginname}}</span>
													<span class="time">{{item.create_at | formateDate}}</span>
												</div>
											</div>
											<div class="detail" v-html="item.content"></div>
											<div class="icon">
												<i class="icon-envelop" @click="reply(index)"></i>
												<i class="icon-thumb_up" :key="item.id" @click="_ups(index, $event)"></i>
											</div>
										</div>
										<reply v-if="index === i && showFlag" @cancel="cancelReply" @confirm="confirmReply"></reply>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<layer ref="layer" :layerText="layerText"></layer>
		</div>
	</transition>
</template>
<script>
	import Header from 'components/header/header.vue'
	import Reply from 'base/reply/reply.vue'
	import BScroll from 'better-scroll'
	import Layer from 'base/layer/layer.vue'
	import { formatNewDate } from 'common/js/filter'
	import { mapActions, mapGetters } from 'vuex'
	import { createArt } from 'common/js/article'
	import { replies, getTopicInfo, ups } from 'common/api/api'
	import { addClass, removeClass } from 'common/js/dom'
	export default {
		data() {
			return {
				id: '',
				userId: '',
				data: {},
				loginname: '',
				favorite: false,
				i: -1,
				showFlag: false,
				layerText: '',
				accesstoken: '',
				isUp: false
			}
		},
		// vue 会为 data 里所有属性添加 getter/setter 方法, 实现双向绑定 Observer（观察者模式）
		created() {
			this.id = this.$route.params.id
			this.accesstoken = localStorage.getItem('accesstoken'),
			this._getTopicInfo()
			this.isLogin()
			this.userId = localStorage.getItem('user_id')		
		},
		computed: {
			getTitle() {
				return this.data.tab === 'share' ? '分享' : (this.data.tab === 'good' ? '精华' : '置顶')
			},
			...mapGetters([
				'favoriteHistory'
			])
		},
		methods: {
			back() {
				this.$router.back()
			},
			_getTopicInfo() {
				getTopicInfo(this.id).then((res) => {
        	if (res.statusText === 'OK') {
        		this.data = res.data.data
        		this.initScroll()
        		const replies = this.data.replies
      			const index = replies.findIndex((item) => {
      				return item === this.user_id
      			})
      			console.log(replies)
        	}
        })
			},
			initScroll() {
				this.$nextTick(() => {
					this.scroll = new	BScroll(this.$refs.content, {
						click: true
					})
				})
			},
			isLogin() {
				this.loginname = localStorage.getItem('loginname')
			},
			toggleFavorite() {
				if (this.isFavorite(this.data)) {
					this.deleteFavoriteHistory(this.data)
				} else {
					this.saveFavoriteHistory(createArt(this.data))
				}
			},
			toggleIcon(data) {
				if (this.isFavorite(data)) {
					return 'icon-star-full'
				} else {
					return 'icon-star-empty'
				}
			},
			toggleText(data) {
				if (this.isFavorite(data)) {
					return '已收藏'
				} else {
					return '收藏'
				}
			},
			// 判断是否已收藏
			isFavorite(art) {
				const index = this.favoriteHistory.findIndex((item) => {
					return art.id === item.id
				})
				return index > -1
			},
			...mapActions([
				'saveFavoriteHistory',
				'deleteFavoriteHistory'
			]),
			// 点击打开评论或关闭
			reply(index){
				this.i = index
				this.showFlag = !this.showFlag
			},
			// 取消 评论
			cancelReply() {
				this.showFlag = !this.showFlag
			},
			// 评论
			confirmReply(text) {
				if (!this.accesstoken) {
					this.$refs.layer.layer_msg('请先登录哦，亲！')
					return
				}

				const topic_id = this.id
				const data = {
					content: text,
					reply_id: this.data.replies[this.i].id
				}
				replies(topic_id, this.accesstoken, data.content, data.reply_id)
				.then((res) => {
					// console.log(res)
					this.$refs.layer.layer_msg('评论成功')
					this.showFlag = false
				})
				.catch(() => {
					if (!data.content) {
						this.$refs.layer.layer_msg('内容不能为空哦！')
					}else {
						this.$refs.layer.layer_msg('评论失败，请重试')
					}
				})
			},
			// 点赞
			_ups(index, e) {
				if (!this.accesstoken) {
					this.$refs.layer.layer_msg('请先登录哦，亲！')
					return
				}

				const reply_id = this.data.replies[index].id
				const thumbUp = {
					id: reply_id,
					el: e.target
				}
				ups(reply_id, this.accesstoken)
				.then((res) => {
					if (res.data.success) {
						if (res.data.action === 'up') {
							this.isUp = true						
							addClass(e.target, 'on')
						} else {
							this.isUp = false
							removeClass(e.target, 'on')
						}
					} else{
						this.layerText = res.data.error_msg
						this.$refs.layer.show()
					}
				})
				.catch((e) => {
					this.$refs.layer.layer_msg('点赞失败，请重试!')
					console.log(e)
				})
			}
		},
		filters: {
			formateDate(time) {
				return formatNewDate(time)
			}
		},
		components: {
			'v-header': Header,
			Reply,
			Layer
		}
	}
</script>
<style lang="stylus">
	@import "~common/stylus/content.styl"

	.page-detail
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		width: 100%
		z-index: 100
		background: #fff
		&.fade-enter-active, &.fade-leave-active
			transition: all 0.3s
		&.fade-enter, &.fade-leave-to
			transform: translate3d(100%, 0, 0)
		.header
			display: flex
			z-index: 200
			.center
				display: flex
				align-items: center
				justify-content: center
				color: #fff
			.back
				width: 50px
				flex: 0 0 50px
				font-size: 24px
			.title
				flex: 1
				h2
					max-width: 275px
					overflow: hidden
					text-overflow:ellipsis
					white-space: nowrap
					font-size: 16px
			.popover
				width: 50px
				flex: 0 0 50px
		.content
			position: fixed
			top: 60px
			right: 0
			bottom: 0
			left: 0
			width: 100%
			.content-title
				display: table
				height: 60px
				padding: 0 24px
				border-bottom: 1px solid #eee
				.title-info
					display: table-cell
					vertical-align: middle
					font-size: 14px
					.desc
						line-height: 20px
			.content-author
				padding: 10px 24px
				border-bottom: 1px solid #eee
				.author-info
					display: flex
					.avatar
						width: 48px
						height: 48px
						flex: 0 0 48px
						margin-right: 20px
					.desc
						flex: 1
						height: 48px
						line-height: 24px
						font-size: 12px
						color: gray
			.content-collect
				padding: 20px 0 8px
				text-align: center
				.collect-wrapper
					font-size: 0
					i
						font-size: 20px
						padding: 10px
						&.icon-star-full
							color: red
					span
						font-size: 20px
			.content-main
				padding: 12px 24px
				border-bottom: 8px solid #eee
				.text
					color: #474a4f
			.content-comments
				.title
					padding: 0 24px
					height: 48px
					line-height: 48px
					font-size: 14px
					background: #f6f6f6
				.comments
					margin: 0 24px
					.item
						padding: 12px 0
						border-bottom: 1px solid #eee
						.wrapper
							position: relative
							&:last-child
								border: none
							.user
								font-size: 0
								margin-bottom: 12px
								.avatar
									display: inline-block
									width: 48px
									height: 48px
									vertical-align: middle
									margin-right: 20px
								.name
									display: inline-block
									font-size: 14px
									vertical-align: middle
							.detail
								p
									font-size: 14px
									line-height: 20px
									margin-right: 60px
							.icon
								position: absolute
								bottom: 3px
								right: 0
								font-size: 14px
								color: gray
								.icon-envelop
									padding: 12px 6px 12px 12px
								.icon-thumb_up
									padding: 12px 0 12px 6px
									&.on
										color: red
</style>