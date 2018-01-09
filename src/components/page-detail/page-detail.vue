<template>
	<transition name="fade">
		<div class="page-detail">
			<v-header>
				<div class="header">
					<div class="back center" @click="back">
						<i class="icon-chevron-up"></i>
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
					<div class="content-collect">
						<div class="collect-wrapper">
							<i class="icon-star-empty icon"></i>
							<span>收藏</span>
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
								<li class="item" v-for="item in data.replies">
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
											<i class="icon-envelop"></i>
											<i class="icon-chevron-up"></i>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import Header from 'components/header/header.vue'
	import axios from 'axios'
	import { formatNewDate } from 'common/js/filter'
	import BScroll from 'better-scroll'
	import marked from 'marked'

	export default {
		data() {
			return {
				id: '',
				data: {},
				
			}
		},
		components: {
			'v-header': Header
		},
		created() {
			this.id = this.$route.params.id
			this.getTopicInfo()
		},
		computed: {
			getTitle() {
				return this.data.tab === 'share' ? '分享' : (this.data.tab === 'good' ? '精华' : '置顶')
			},
			compiledMarkdown() {
		    return marked(this.content, { sanitize: true })
		  }
		},
		methods: {
			back() {
				this.$router.back()
			},
			getTopicInfo() {
				const url = `https://www.vue-js.com/api/v1/topic/${this.id}`

				axios.get(url, {
          params: {
            mdrender: true
          }
        })
        .then((res) => {
        	if (res.statusText === 'OK') {
        		this.data = res.data.data
        		console.log(this.data)
        		this.initScroll()
        	}
        })
			},
			initScroll() {
				this.$nextTick(() => {
					this.scroll = new	BScroll(this.$refs.content, {
						click: true
					})
				})
			}
		},
		filters: {
			formateDate(time) {
				return formatNewDate(time)
			}
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
				font-size: 26px
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
				height: 60px
				line-height: 60px
				padding: 0 24px
				border-bottom: 1px solid #eee
				.title-info
					.title
						font-size: 14px
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
						margin-right: 10px
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
						position: relative
						padding: 12px 0
						border-bottom: 1px solid #eee
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
							bottom: 12px
							right: 0
							.icon-envelop
								padding: 12px 6px 12px 12px
							.icon-chevron-up
								padding: 12px 12px 12px 6px
</style>