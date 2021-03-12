<template>
	<div>
		<el-row>
			<el-table :data="feedbackList">
				<el-table-column label="用户名">
					<template slot-scope="scope">
						<span v-if="scope.row.user.nick">{{scope.row.user.nick}}</span>
						<span v-else>未知</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号">
					<template slot-scope="scope">
						<span v-if="scope.row.user.mobile">{{scope.row.user.mobile}}</span>
						<span v-else>未知</span>
					</template>
				</el-table-column>
				<el-table-column label="头像">
					<template slot-scope="scope">
						<img v-if="scope.row.user.avatar" :src="config.qiniuHost+scope.row.user.avatar" style="width:40px;height:40px;" />
						<el-image v-else></el-image>
					</template>
				</el-table-column>
				<el-table-column label="邮箱" prop="email"></el-table-column>
				<el-table-column label="反馈时间">
					<template slot-scope="scope">
						<span>{{timeFormat(scope.row.create_time)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="图片">
					<template slot-scope="scope">
						<img style="width:40px;height:40px;cursor:pointer;" :src="config.qiniuHost+item" v-for="(item,index) in scope.row.pic" :key="item+index" @click="preview(item)" v-if="item" title="单击可预览" />
						<span v-else>
              <!--<el-image></el-image>-->
              	无
            </span>
					</template>
				</el-table-column>
				<el-table-column label="内容" prop="content"></el-table-column>
				<el-table-column label="类型" prop="type"></el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<el-dialog title="图片预览" :visible.sync="dialogTableVisible">
				<img style="width:100%;height:100%" :src="previewSrc">
			</el-dialog>
		</el-row>
	</div>
</template>
<script>
	import { format } from "date-fns";
	export default {
		data() {
			return {
				feedbackList: null,
				dialogTableVisible: false,
				previewSrc: ""
			};
		},
		created() {
			this.getFeedbackList();
		},
		methods: {
			timeFormat(time) {
				return format(time * 1000, "YYYY/MM/DD HH:mm");
			},
			getFeedbackList() {
				this.getRequest("feedback/adminGet", {}).then(res => {
					if(res) {
						console.log('adminGet-------', res);
						//图片字符串转数组
						this.feedbackList = res.rows.map(item => {
							return { ...item,
								pic: item.pic.split(",")
							};
						});
					}
				});
			},
			preview(image) {
				this.dialogTableVisible = true;
				this.previewSrc = this.config.qiniuHost + image;
			}
		}
	};
</script>
<style lang="scss">

</style>