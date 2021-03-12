<template>
<div>
    <el-row>
        <el-col :span="3">
            <el-button @click="add" type="primary" :loading="loading" style="margin:20px 20px;">添加用户</el-button>
        </el-col>
        <el-col :span="3" :offset="8">
            <el-select v-model="searchValue" placeholder="请选择">
                <el-option v-for="item in searchOpt" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-input v-model="searchContent" placeholder="可模糊搜索"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
            <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
    </el-row>

    <el-table :data="userList" size="mini" v-loading="loading">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="申请内容">
                        <el-row v-if="props.row.type == 1">
                            <span>公司名：</span>{{props.row.company_apply.company_name}}
                            <span>公司地址：</span>{{props.row.company_apply.company_name}}
                            <span>营业执照号：</span>{{props.row.company_apply.company_name}}
                            <span>法人：</span>{{props.row.company_apply.company_name}}
                            <span>身份证头像面：</span>
                            <img :src="$qiniuHost+props.row.company_apply.id_card_copy_qiniu" v-bind:preview="props.$index" preview-text="身份证头像面">
                            <span>身份证国徽面：</span>
                            <img :src="qiniuHost+props.row.company_apply.id_card_national_qiniu" v-bind:preview="props.$index" preview-text="身份证国徽面">
                            <span>手持身份证：</span>
                            <img :src="qiniuHost+props.row.company_apply.id_card_handle_qiniu" v-bind:preview="props.$index" preview-text="手持身份证照片">
                            <span>联系电话：</span>{{props.row.company_apply.contact_phone}}
                            <span>公司电话：</span>{{props.row.company_apply.company_phone}}
                            <span>邮箱：</span>{{props.row.company_apply.email}}
                            <span>开户银行：</span>{{props.row.company_apply.company_account_bank}}
                            <span>开户银行地点：</span>{{props.row.company_apply.company_bank_address_code}}
                            <span>开户银行全称：</span>{{props.row.company_apply.company_bank_name}}
                            <span>银行账号：</span>{{props.row.company_apply.company_account_number}}
                            <span>合约：</span>
                            <img :src="qiniuHost+props.row.company_apply.company_paper_qiniu" v-bind:preview="props.$index" preview-text="合约">
                        </el-row>
                    </el-form-item>
                    <el-form-item label="操作权限">
                        <el-select v-model="props.row.role" placeholder="请选择">
                            <el-option v-for="item in roleOptions" :key="item.key" :label="item.val" :value="item.key">
                            </el-option>
                        </el-select>
                        <el-button type="primary" @click="grantRole(props.row ,props.$index,props.row.role)">确认给权限</el-button>
                    </el-form-item>

                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column prop="nick" label="昵称" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
        <!-- <el-table-column label="头像" align="center">

<template slot-scope="scope">

<el-image v-if="scope.row.avatar!=null && scope.row.avatar.length>0" style="max-width:30px" :src="qiniuHost+scope.row.avatar"></el-image>

</template>

</el-table-column> -->
        <el-table-column label="注册时间" align="center">
            <template slot-scope="scope">{{scope.row.create_time|time2DateFull}}</template>
        </el-table-column>
        <el-table-column label="类型">
            <template slot-scope="scope">
                <el-tag :type="scope.row.role==1?'danger':''">{{scope.row.role|rowFilter}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            	<el-button type="text" size="mini" @click="toShopServe(scope.row)" v-if="scope.row.role!=0">进入商家后台</el-button>
                <el-button type="text" size="mini" @click="goDetail(scope.row)" v-if="scope.row.role!=0">详情</el-button>
                <el-button type="text" size="mini" @click="subAccount(scope.row)" v-if="scope.row.role!=0">子账号</el-button>
                <el-button type="text" size="mini" @click="initPwd(scope.row)">初始化密码</el-button>
                <el-button type="text" size="mini" @click="editStoreInfo(scope.row)" v-if="!scope.row.storeInfo && scope.row.role==1">添加商家资料</el-button>
                <el-button type="text" size="mini" @click="editStoreInfo(scope.row)" v-if="scope.row.storeInfo">修改商家资料</el-button>
                <!-- <el-button type="text" size="mini" @click="opt(scope.row)" v-if="scope.row.role!=0">子账号</el-button> -->
            </template>
        </el-table-column>
        <!-- <el-table-column label="运营添加">
            <template slot-scope="scope">{{scope.row.is_manual|isManual}}</template>
        </el-table-column> -->
        <el-table-column v-if="false" prop="is_manual" label="第三方">
            <template slot-scope="scope">
                <svg t="1566910269833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5200" width="20" height="20">
                    <path d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" fill="#00C800" p-id="5201" />
                    <path d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" fill="#00C800" p-id="5202" />
                </svg>
            </template>
        </el-table-column>
    </el-table>
    <center>
        <el-pagination background @size-change="handleLoad" @current-change="handleLoad" :current-page.sync="loadingParameter.page" :page-sizes="[20, 100,200]" :page-size.sync="loadingParameter.page_size" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </center>
    <el-dialog title="添加用户" :visible.sync="dialogVisable">
        <el-form ref="form" :model="addForm" :rules="rules">
            <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nick" :label-width="formLabelWidth">
                <el-input v-model="addForm.nick" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="addForm.role" placeholder="请选择活动区域">
                    <el-option label="普通" value="0"></el-option>
                    <el-option label="商户" value="1"></el-option>
                    <el-option label="运营" value="3"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisable = false">取 消</el-button>
            <el-button :loading="addLoding" type="primary" @click="addAction">确 定</el-button>
        </div>
    </el-dialog>

    <!--添加,修改商家资料对话框-->
    <el-dialog :visible.sync="showHire" class="dialog">
        <el-form :model="hireForm" label-width="120px" ref="hireForm" :rules="hireRules">
            <el-form-item label="商家姓名：" prop="shop_name">
                <el-input v-model="hireForm.shop_name" placeholder="请输入4-32个字符"></el-input>
            </el-form-item>
            <el-form-item label="公司电话：" prop="shop_mobile">
                <el-input v-model="hireForm.shop_mobile" placeholder="请输入符合格式的座机号码，带区号则区号后面需要加 -"></el-input>
            </el-form-item>
            <el-form-item class="address" label="办公室地址：" required>
                <el-form-item prop="selectAddress" class="selectAddress">
                    <el-cascader size="large" :options="cityOptions" v-model="hireForm.selectAddress" placeholder="请选择省份/城市/地区">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="addressDetail" class="inputAddress">
                    <el-input v-model="hireForm.addressDetail" placeholder="请输入详细地址"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="hireForm.email" placeholder="请输入正确的邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" class="people" prop="contact_name">
                <el-input v-model="hireForm.contact_name" placeholder="请输入您的称呼"></el-input>
                <el-radio v-model="sex" label="1">先生</el-radio>
                <el-radio v-model="sex" label="2">女士</el-radio>
            </el-form-item>
            <el-form-item label="联系人手机：" prop="contact_mobile">
                <el-input v-model="hireForm.contact_mobile" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <div class="grey-line"></div>
            <el-form-item class="upload-agreement" label="上传合同：" prop="contract">
                <div class="upload-wrap">
                    <el-upload class="avatar-uploader" :on-success="handleAgreementSuccess" :before-upload="beforeAgreementUpload" :data="picAgreement" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
                        <img v-if="agreementUrl" :src="agreementUrl" class="avatar">
                        <div class="layer" v-if="agreementUrl">
                            <div class="layer-left" @click.stop="stopBubble"></div>
                            <div class="layer-center">
                                <!--<i class="el-icon-view" @click.stop="previewAgreement"></i>-->
                                <!--<i class="el-icon-edit" @click="changeAgreement"></i>-->
                                <!--<i class="el-icon-delete" @click.stop="delAgreement"></i>-->
                            </div>
                            <div class="layer-right" @click.stop="stopBubble"></div>
                        </div>
                        <i v-if="!agreementUrl" class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!--<p>请上传《商家入驻协议》</p>-->
                    <el-dialog :visible.sync="agreementBig">
                        <img width="100%" class="el-img" :src="agreementUrl" alt />
                    </el-dialog>

                </div>
                <div class="message-tip">
                    <p>
                        <span @click="downLoad">下载</span>
                    </p>
                </div>
            </el-form-item>
            <el-form-item class="upload-license" label="上传营业执照：" prop="license">
                <div class="upload-wrap">
                    <el-upload class="avatar-uploader" :on-success="handleLicenseSuccess" :before-upload="beforeLicenseUpload" :data="picLicense" action="https://up-z2.qiniup.com/" list-type="picture-card" :show-file-list="false">
                        <img v-if="licenseUrl" :src="licenseUrl" class="avatar">
                        <div class="layer" v-if="licenseUrl">
                            <div class="layer-left" @click.stop="stopBubble"></div>
                            <div class="layer-center">
                                <!--<i class="el-icon-view" @click.stop="previewLicense"></i>-->
                                <!--<i class="el-icon-edit" @click="changeLicense"></i>-->
                                <!--<i class="el-icon-delete" @click.stop="delLicense"></i>-->
                            </div>
                            <div class="layer-right" @click.stop="stopBubble"></div>
                        </div>
                        <i v-if="!licenseUrl" class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p>请上传营业执照</p>
                    <el-dialog :visible.sync="licenseBig">
                        <img width="100%" class="el-img" :src="licenseUrl" alt />
                    </el-dialog>

                </div>
            </el-form-item>
            <div class="bottom-btn">
                <el-button type="primary" @click="editInfo('hireForm')">添加</el-button>
                <el-button @click="showHire=false">取消</el-button>
            </div>
        </el-form>
    </el-dialog>

</div>
</template>

<script>
import {
    RoleName
} from '@config/config';
import {
    user,
    qiniuPic
} from "@config/api.js";
import {
    isNumber
} from "util";
import {
    checkPic
} from "@util/picUtil.js";
import {
    regionData
} from 'element-china-area-data'
import {
    mapGetters
} from "vuex";
export default {
    components: {},
    data() {
        return {
            selfRoleName: RoleName,
            roleOptions: [],
            searchOpt: [{
                    value: "",
                    label: "全部类型"
                },
                {
                    value: 1,
                    label: "商家"
                },
                {
                    value: 0,
                    label: "用户"
                },
                {
                    value: 3,
                    label: "运营"
                }
            ],
            //判断列表是否为搜索出来的
            searchRes: false,
            searchContent: "",
            searchValue: "",
            acountOpt: "全部账号",
            userList: [],
            qiniuHost: this.config.qiniuHost,
            loading: false,
            addLoding: false,
            loadingParameter: {
                page: 1,
                page_size: 20
            },
            totalCount: 0,
            dialogVisable: false,
            addForm: {
                mobile: "",
                nick: "",
                role: "0"
            },
            formLabelWidth: "80px",
            rules: {
                nick: [{
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 32,
                        message: "长度在 2 到 32个字符",
                        trigger: "blur"
                    }
                ],
                mobile: [{
                        required: true,
                        message: "请输入手机",
                        trigger: "blur"
                    },
                    {
                        validator: this.validate.validatePhone,
                        trigger: "blur"
                    }
                ],
            },
            sex: '1',
            showHire: false, //是否显示添加商家资料对话框
            cityOptions: regionData,
            picAgreement: {},
            picLicense: {},
            agreementUrl: '',
            agreementBig: false,
            licenseUrl: '',
            licenseBig: false,
            selectStroe: {}, //选择的商家
            hireForm: {
                type: 1,
                shop_name: '',
                shop_mobile: '',
                address: '',
                selectAddress: [],
                addressDetail: '',
                email: '',
                contact_name: '',
                contact_mobile: '',
                license: '',
                contract: ''
            },

            // 图片预览
            hireRules: {
                shop_name: [{
                        required: true,
                        message: '请输入商店名称',
                        trigger: 'blur'
                    },
                    {
                        min: 4,
                        max: 32,
                        message: '长度在 4 到 32 个字符',
                        trigger: 'blur'
                    }
                ],
                shop_mobile: [{
                        required: true,
                        message: '请输入公司电话',
                        trigger: 'blur'
                    },
                    {
                        pattern: /\d{3}-\d{8}|\d{4}-\d{7}|(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                        message: '电话号码格式不正确',
                        trigger: 'blur'
                    }
                ],
                selectAddress: [{
                    type: 'array',
                    required: true,
                    message: '请选择地址',
                    trigger: 'change'
                }, ],
                addressDetail: [{
                    required: true,
                    message: '请输入详细地址',
                    trigger: 'blur'
                }, ],
                email: [{
                        required: true,
                        message: '请输入电子邮箱',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur'
                    }
                ],
                contact_name: [{
                    required: true,
                    message: '请输入联系人',
                    trigger: 'blur'
                }, ],
                contact_mobile: [{
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^400[0-9]{7}|^1[34578]\d{9}$|^0[0-9]{2,3}[0-9]{8}/,
                        message: '电话号码格式不正确',
                        trigger: 'blur'
                    }
                ],
                contract: [{
                    required: true,
                    message: '请上传合同',
                    trigger: 'blur'
                }, ],
                license: [{
                    required: true,
                    message: '请上传营业执照',
                    trigger: 'blur'
                }, ]
            },
            num: 0,

        };
    },
    filters: {
        rowFilter(val) {
//          if (val == 0) {
//              return "普通用户";
//          } else if (val == 1) {
//              return "商家";
//          } else if (val == 3) {
//              return "运营";
//          }
//          return "未知";
			switch(parseInt(val)){
				case 0:
					return '普通用户';
					break;
				case 2:
					return '租赁商';
					break;
				case 4:
					return '运营';
					break;
				case 8:
					return '摄影公司';
					break;
				case 16:
					return '模特公司';
					break;
				case 64:
					return '个人摄影师';
					break;
				case 128:
					return '个人模特';
					break;
				default:
					return '未知';
			}
        },
        isManual(val) {
            return val == 1 ? "是" : "否";
        }
    },
    created() {
        for (let key in this.selfRoleName) {
            console.log(key + '---' + this.selfRoleName[key])
            this.roleOptions.push({
                key: key,
                val: this.selfRoleName[key]
            });
        }
    },
    computed: {
        ...mapGetters(["user_data"]),
    },
    mounted() {
        this.loadUser();
        console.log('this.user_data-------', this.user_data);
    },
    methods: {
    	//进入商家后台
    	toShopServe(item){
    		console.log('toShopServe------',item);
    		console.log('uid---------',item.id);
    		//获取用户token(免密)
    		this.util.getUserToken(item.id).then(res=>{
                console.log('getUserToken------',res);
                let url='https://paitume.com/jumplogin?'
                // let url='http://127.0.0.1:1114/jumplogin?'
                for(let item in res){
                    url+=item+'='+res[item]+'&'
                }
                url=url.substring(0,url.length-1)
                window.open(url)
    		})
    	},
        //加载用户列表信息方法
        loadUser() {
            this.loading = true;
            this.getRequest(user.get, this.loadingParameter)
                .then(res => {
                    console.log('getUser-----------', res);
                    this.loading = false;

                    this.userList = res.rows;
                    this.num = 0;
                    this.userList.forEach((item, index) => {
                        if (item.role == 1) {
                            this.num++;
                        }
                    })
                    console.log('num-0---------', this.num);
                    // this.userList.forEach(async (item,index)=>{
                    // 	if(item.role==1){
                    // 		//获取商家信息
                    // 		let storeInfo=await this.getServeInfo(item.id);
                    // 		this.$set(item,'storeInfo',storeInfo);
                    // 	}
                    // })
                    this.totalCount = parseInt(res.total_count);
                    this.loadingParameter.page = parseInt(res.page);
                    this.loadingParameter.page_size = parseInt(res.page_size);
                    console.log('this.userList----------', this.userList);
                })
                .catch(err => {
                    this.loading = false;
                });
        },

        //商家查询资料方法
        getServeInfo(id) {

            return new Promise((resolve, reject) => {
                this.util.getServeInfo(id).then(res => {
                    console.log('getServeInfo-----', res);
                    this.num--;
                    if (this.num == 0) {
                        console.log('this.userList---------', this.userList);
                    }
                    resolve(res);
                })
            })

        },

        //下载文档方法
        downLoad() {
            window.open('https://pic.paitume.com/%E5%90%88%E5%90%8C.docx?' + (new Date()).valueOf())
        },
        //跳转到添加、修改商家资料方法
        editStoreInfo(item) {
            console.log('item.storeInfo---------', item.storeInfo);
            this.showHire = true;
            this.selectStroe = item;
            if (item.storeInfo) {
                for (let i in item.storeInfo) {
                    for (let j in this.hireForm) {
                        if (i == j) {
                            this.hireForm[j] = item.storeInfo[i];
                        }
                    }
                }
            } else {
                for (let i in this.hireForm) {
                    if (i == 'type') {
                        this.hireForm[i] = 1;
                    } else {
                        this.hireForm[i] = '';
                    }
                }
            }
            console.log('editStoreInfo----------', this.hireForm);
        },

        //添加,修改商家资料方法
        editInfo() {
            this.hireForm.uid = this.selectStroe.id;
            this.hireForm.address = this.hireForm.selectAddress + this.hireForm.addressDetail;
            console.log('editInfo----------', this.hireForm);
            this.util.editServeInfo(this.hireForm).then(res => {
                this.$message.success("操作成功！");
                this.showHire = false;
                console.log("editServeInfo-------", res);
                this.loadUser();
            })
        },

        handleLicenseSuccess(file) {
            console.log('图片上传成功', file)
            this.licenseUrl = this.$qiniuHost + file.key
            this.hireForm.license = file.key
        },

        beforeAgreementUpload(file) {
            console.log('beforeAgreementUpload-------图片上传之前')
            const fileName = file.uid;
            return new Promise((resolve, reject) => {
                let Sync = async () => {
                    try {
                        let picKey = await checkPic(file);
                        if (picKey) {
                            let token = await this.getRequest(
                                "/qiniu/serveGetQiniuUpToken?key=" + picKey
                            );
                            this.picAgreement = token;
                            this.picAgreement.uid = file.uid;
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    } catch (error) {
                        reject(false);
                    }
                };
                Sync();
            });
        },
        beforeLicenseUpload(file) {
            console.log('beforeLicenseUpload------图片上传之前')
            const fileName = file.uid;
            return new Promise((resolve, reject) => {
                let Sync = async () => {
                    try {
                        let picKey = await checkPic(file);
                        if (picKey) {
                            let token = await this.getRequest(
                                "/qiniu/serveGetQiniuUpToken?key=" + picKey
                            );
                            this.picLicense = token;
                            this.picLicense.uid = file.uid;
                            resolve(true);
                        } else {
                            reject(false);
                        }
                    } catch (error) {
                        reject(false);
                    }
                };
                Sync();
            });
        },
        //协议图片上传成功
        handleAgreementSuccess(file) {
            console.log('图片上传成功', file)
            this.agreementUrl = this.$qiniuHost + file.key
            this.hireForm.contract = file.key
        },

        handleLoad() {
            if (this.searchRes) {
                //不是搜索的结果
                this.loadUser();
            } else {
                this.search();
            }
        },
        handleCommand(command) {
            this.acountOpt = command;
            switch (command) {
                case "全部账号":
                    this.loadingParameter = {
                        page: this.loadingParameter.page,
                        page_size: this.loadingParameter.page_size
                    };
                    break;
                case "商家账号":
                    this.loadingParameter = {
                        ...this.loadingParameter,
                        role: 1
                    };
                    break;
                case "普通账号":
                    this.loadingParameter = {
                        ...this.loadingParameter,
                        role: 0
                    };
                    break;
                case "运营账号":
                    this.loadingParameter = {
                        ...this.loadingParameter,
                        role: 3
                    };
                    break;
            }
            this.loadUser();
        },
        //搜索
        search() {
            let role = isNumber(this.searchValue) ? this.searchValue : null;
            this.getRequest("user/get", {
                role: role,
                search: this.searchContent,
                ...this.loadingParameter
            }).then(res => {
                if (res) {
                    this.userList = res.rows;
                    this.totalCount = parseInt(res.total_count);
                    this.loadingParameter.page = parseInt(res.page);
                    this.loadingParameter.page_size = parseInt(res.page_size);
                }
            });
        },
        goDetail(row) {
            console.log(11111);
            this.$router.push({
                path: "/serve/user/userDetail",
                query: {
                    uid: row.id
                }
            });
        },
        subAccount(row) {
            this.$router.push({
                path: "/serve/user/subAccount",
                query: {
                    uid: row.id
                }
            });
        },
        grantRole(row, index,role) {
            const _this = this;
            this.$confirm("确定要给[" + row.nick + "] ["+this.selfRoleName[role]+"]权限么" + "?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    console.log("user = ", user);
                    _this
                        .postRequest(user.grantRole, {
                            id: row.id,
							role:role
                        })
                        .then(res => {
                            _this.$message({
                                message: "给予商家权限成功",
                                type: "success"
                            });
                            _this.userList[index].role = res;
                        }).catch(err=>{});
                })
                .catch(() => {});
        },
        initPwd(row) {
            const _this = this;
            this.$confirm(
                    "确定要给[" + row.nick + "]更新密码为 123123" + "?",
                    "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                .then(() => {
                    _this
                        .postRequest(user.initPwd, {
                            id: row.id
                        })
                        .then(res => {
                            _this.$message.success("初始化密码成功");
                        });
                })
                .catch(() => {});
        },

        loadUserProductStoreList() {
            this.getRequest("product/userProductStoreList");
        },
        add() {
            this.dialogVisable = true;
        },
        addAction() {
            const _this = this;
            this.$refs["form"].validate(valid => {
                if (valid) {
                    _this.addLoding = true;
                    _this.dialogVisable = false;
                    this.postRequest(user.add, _this.addForm)
                        .then(res => {
                            _this.addLoding = false;
                            _this.$message.success("添加客户成功！");
                            _this.addForm = {
                                mobile: "",
                                nick: "",
                                role: "0"
                            };
                        })
                        .catch(err => {
                            _this.addLoding = false;
                        });
                    this.loadUser();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        refresh() {
            this.loading = true;
            this.getRequest(qiniuPic.refresh)
                .then(res => {
                    this.loading = false;
                    if (res > 0) {
                        this.$message.success("刷新成功,还剩" + res + "条");
                        this.refresh();
                    }
                })
                .catch(err => {
                    this.loading = false;
                });
        }

    }
};
</script>

<style lang="scss" scoped>
/deep/ .el-button--primary {
    margin: 0 !important
}

.el-row {
    padding: 20px;
}

.el-upload {
    img {
        width: 100%;
        height: auto;
    }
}

img {
    max-width: 100px;
    max-height: 100px;
}
</style>
