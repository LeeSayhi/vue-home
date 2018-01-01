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
		<div class="content">
			<div class="content-title">
				<div class="title-info">
					<span class="title">{{getTitle}}</span>
					<span class="desc">{{data.title}}</span>
				</div>
			</div>
			<div class="content-author">
				<div class="author-info">
					<div class="avatar">
						<img :src="data.author.avatar_url" width="48" height="48">
					</div>
					<div class="desc">
						<span>作者：{{data.author.loginname}}</span>
						<span>发表时间：{{data.create_at | formateDate}}</span>
						<span>最后回复：{{data.last_reply_at | formateDate}}</span>
						<span>浏览量：{{data.visit_count}}</span>
					</div>
				</div>
			</div>
			<div class="content-main">
				<div class="text">
					<p v-html="data.content"></p>
				</div>
			</div>
			<div class="content-comments">
				<div class="title">
					<h3>28</h3>
				</div>
				<div class="comments">
					<ul>
						<li class="item">
							<div class="wrapper">
								<div class="user">
									<div class="avatar">
										<img src="" width="48" height="48">
									</div>
									<div class="name">
										<span>lee</span>
										<span class="time">8月前</span>
									</div>
								</div>
								<div class="detail">
									<p>nudndnfdunfdufndu</p>
								</div>
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
	</transition>
</template>
<script>
	import Header from 'components/header/header.vue'
	import axios from 'axios'
	import { formatNewDate } from 'common/js/filter'

	export default {
		data() {
			return {
				id: '',
				data: {}
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
        	}
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
<style scoped lang="stylus">
	.page-detail
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		width: 100%
		z-index: 200
		background: #fff
		&.fade-enter-active, &.fade-leave-active
			transition: all 0.3s
		&.fade-enter, &.fade-leave-to
			transform: translate3d(100%, 0, 0)
		.header
			display: flex
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
			position: relative
			top: 60px
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
			.content-main
				padding: 12px 24px
				border-bottom: 8px solid #eee
				p
					font-size: 16px
					word-wrap: break-word
			.content-comments
				.title
					padding: 0 24px
					height: 48px
					line-height: 48px
					font-size: 14px
					background: #f6f6f6
				.comments
					position: relative
					margin: 0 24px
					border-bottom: 1px solid #eee
					.item
						padding: 12px 0
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
						.icon
							position: absolute
							bottom: 12px
							right: 0
</style>