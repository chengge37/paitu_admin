<!--  -->
<template>
<div class="form-box">
    <remote-js :srcArr="srcArr" @scriptLoad="callbackFn"></remote-js>
    <el-tabs v-model="activeProgress">
        <el-tab-pane label="创建" name="createMiniApp">
            <p style="margin-bottom:10px">这一步是创建小程序，提交以下数据会给法人微信推送一条验证消息，24小时内有效，超时未验证需要重新申请</p>
            <el-row :gutter="20">
                <el-col :span="14" :offset="4">
                    <div>
                        <el-form ref="createMiniAppForm" :model="createMiniAppForm" :rules="rules" label-width="140px" label-position="left" :disabled="disableCreate">
                            <el-form-item label="法人微信：" prop="legal_persona_wechat">
                                <el-input v-model="createMiniAppForm.legal_persona_wechat" placeholder="请输入法人微信号（大于6个字符）"></el-input>
                            </el-form-item>
                            <el-form-item label="法人姓名：" prop="legal_persona_name">
                                <el-input v-model="createMiniAppForm.legal_persona_name" placeholder="请输入法人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="公司类别：" prop="organization_type">
                                <div class="company">
                                    <el-select v-model="createMiniAppForm.organization_type" placeholder="请选择">
                                        <el-option v-for="item in organization_type_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="企业名称：" prop="company_name">
                                <el-input v-model="createMiniAppForm.company_name" placeholder="请输入企业名称"></el-input>
                            </el-form-item>
                            <el-form-item label="营业执照号" prop="business_license_number">
                                <el-input v-model="createMiniAppForm.business_license_number" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="小程序id">
                                <el-input v-model="createMiniAppForm.wx_app_id" placeholder="生成后有小程序id" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="创建状态">
                                <span>{{createMiniAppForm.mini_app_status|miniAppStatusFilter(createMiniAppStatus)}}</span>
                                <span v-if="createMiniAppForm.mini_app_status==createMiniAppStatus.fail||createMiniAppForm.mini_app_status==createMiniAppStatus.ing">{{createMiniAppForm.mini_app_msg}}</span>
                                <el-button type="info" size="mini" @click="getCreateStatus">查询状态</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>

            <div class="bottom-button">
                <el-button :loading="createLoading" :disabled="disableCreate" type="primary" @click="createMiniApp">创建</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="配置" name="setMiniApp">
            <el-row :gutter="20">
                <el-col :span="14" :offset="4">
                    <div>
                        <el-form label-width="140px" label-position="left">
                            <el-form-item label="查看小程序基本信息">
                                <p>线上自定义版本:{{setForm.online_version}}</p>
                                <el-button :loading="queryMiniAppInfoLoading" @click="queryMiniAppInfo" size="mini" type="primary">查看</el-button>
                            </el-form-item>
                            <el-form-item label="设置服务器：">
                                <el-button :loading="setDomainLoading" @click="setDomain" size="mini" type="primary">设置服务器</el-button>
                                <el-tag size="mini">{{optStatus|optFilter(SelfMiniAppOptCode.WxOptSetDomain)}}</el-tag>
                            </el-form-item>
                            <el-form-item label="设置业务服务器：">
                                <el-button :loading="setWorkDomainLoading" @click="setWorkDomain" size="mini" type="primary">设置业务服务器</el-button>
                                <el-tag size="mini">{{optStatus|optFilter(SelfMiniAppOptCode.WxOptSetWorkDomain)}}</el-tag>
                            </el-form-item>
                            <el-form-item label="设置业务服务器：">
                                <el-button :loading="setCategoryLoading" @click="setCategory" size="mini" type="primary">设置类目</el-button>
                                <el-tag size="mini">{{optStatus|optFilter(SelfMiniAppOptCode.WxOptSetCategory)}}</el-tag>
                            </el-form-item>
                            <el-form-item label="上传小程序ICON">
                                <el-row>
                                    <el-col :span="6">
                                        <OneImgUpload :image-url="setForm.mini_app_icon_qiniu" :width_ratio="1" />
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button :loading="setIconLoading" type="primary" @click="setIcon">设置</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="上传营业执照：">
                                <el-row>
                                    <el-col :span="6">
                                        <OneImgUpload v-model="setForm.company_license_pic_qiniu" :width_ratio="1.4" />
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="设置名称：">
                                <el-input v-model="setForm.mini_app_name" placeholder="请输入小程序名"></el-input>
                                <el-button :loading="setNameLoading" @click="setName" size="mini" type="primary">设置</el-button>
                                <el-tag size="mini">{{optStatus|optFilter(SelfMiniAppOptCode.WxOptSetName)}}</el-tag>
                                <span v-if="!util.isEmpty(setForm.name_audit_id)">审核ID:{{setForm.name_audit_id}}</span>
                                <el-button v-if="!util.isEmpty(setForm.name_audit_id)" :loading="queryNameLoading" @click="queryName" size="mini" type="primary">查询名称审核状态</el-button>
                            </el-form-item>
                            <el-form-item label="设置描述：">
                                <el-input v-model="setForm.info" placeholder="请输入小程序描述"></el-input>
                                <el-button :loading="setInfoLoading" @click="setInfo" size="mini" type="primary">设置</el-button>
                                <el-tag size="mini">{{optStatus|optFilter(SelfMiniAppOptCode.WxOptSetInfo)}}</el-tag>
                            </el-form-item>
                            <el-form-item label="设置代码：">
                                <p>线上自定义版本:{{setForm.online_version}}线上模板版本:{{setForm.online_tpl_version}}系统最新模板版本:{{setForm.last_tpl_version}}</p>
                                <span>系统最新模板版本>线上模板版本的时候才可以设置（更新）,自定义版本没有硬性连续性要求，但要遵循1.0.0这样的格式</span>
                                <el-input v-model="setForm.audit_version" placeholder="请输入自定义版本"></el-input>
                                <el-button :loading="setTplLoading" @click="setTpl" size="mini" type="primary">设置</el-button>
                                <el-tag size="mini">{{optStatus|optFilter(SelfMiniAppOptCode.WxOptUploadTpl)}}</el-tag>
                            </el-form-item>
                            <el-form-item label="审核：">
                                <el-button :loading="commitLoading" @click="setCommit" size="mini" type="primary">提交审核</el-button>
                                <span>审核ID:{{setForm.mini_app_audit_id}}</span>
                                <el-button :loading="commitLoading" @click="queryCommit" size="mini" type="primary">查询审核</el-button>
                                <el-button :loading="commitLoading" @click="releaseCommit" size="mini" type="primary">发布</el-button>
                                <p>{{setForm.mini_app_audit_status|auditStatusFilter(SelfWxAppAuditStatus)}}</p>
                                <p v-if="setForm.mini_app_audit_status==SelfWxAppAuditStatus.WxAppAuditStatusFail" v-html="setForm.mini_app_audit_msg"></p>
                            </el-form-item>
                            <el-form-item label="二维码：">
                                <el-button :loading="genQRLoading" @click="genQR" size="mini" type="primary">生成二维码</el-button>
                                <img :src="setForm.qr_code_url" />
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="支付" name="configPay">
            <p>配置支付</p>
            <el-row :gutter="20">
                <el-col :span="16" :offset="4">
                    <div>
                        <el-form ref="payForm" :model="payForm" :rules="rules" label-width="200px" label-position="left">
                            <el-collapse v-model="activePayGroupName">
                                <el-collapse-item title="法人信息" name="1">
                                    <el-form-item label="姓名">
                                        <el-input :disabled="true" v-model="createMiniAppForm.legal_persona_name" placeholder="姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系手机" prop="contact_phone">
                                        <el-input v-model="payForm.contact_phone" placeholder="姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系邮箱" prop="contact_email">
                                        <el-input v-model="payForm.contact_email" placeholder="邮箱"></el-input>
                                    </el-form-item>
                                    <el-form-item label="身份证号" prop="id_card_number">
                                        <el-input v-model="payForm.id_card_number" placeholder="身份证号"></el-input>
                                    </el-form-item>

                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="身份证人像面" prop="id_card_copy_qiniu">
                                                <OneImgUpload v-model="payForm.id_card_copy_qiniu" :width_ratio="0.63" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="身份证国徽面" prop="id_card_national_qiniu">
                                                <OneImgUpload v-model="payForm.id_card_national_qiniu" :width_ratio="0.63" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-form-item prop="id_card_valid_time" label="身份证有效期(有效期结束必须晚于现在60天)">
                                        <validDatePicker v-model="payForm.id_card_valid_time"></validDatePicker>
                                    </el-form-item>
                                </el-collapse-item>
                                <el-collapse-item title="主体资料" name="2">
                                    <el-form-item label="公司名">
                                        <el-input v-model="createMiniAppForm.company_name" :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="needOrg" label="组织结构代码号" prop="organization_number">
                                        <el-input v-model="payForm.organization_number" placeholder="组织结构代码号"></el-input>
                                    </el-form-item>
                                    <el-form-item v-if="needOrg" label="组织结构代码照片" prop="organization_copy_qiniu">
                                        <el-row>
                                            <el-col :span="6">
                                                <OneImgUpload v-model="payForm.organization_copy_qiniu" :width_ratio="1.4" />
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item prop="organization_time" v-if="needOrg" label="组织结构代码有效期(有效期结束必须晚于现在60天)">
                                        <validDatePicker v-model="payForm.organization_time"></validDatePicker>
                                    </el-form-item>
                                </el-collapse-item>
                                <el-collapse-item title="经营资料" name="3">
                                    <el-form-item label="客服电话" prop="service_phone">
                                        <el-input v-model="payForm.service_phone" placeholder="客服电话,在交易记录中向买家展示"></el-input>
                                    </el-form-item>
                                </el-collapse-item>
                                <el-collapse-item title="结算银行账户" name="4">
                                    <!-- 个人卡 -->
                                    <div v-if="isPersonal">
                                        <el-form-item label="开户名">
                                            <el-input :disabled="true" v-model="createMiniAppForm.legal_persona_name" placeholder="开户名"></el-input>
                                        </el-form-item>
                                        <el-form-item label="个人卡开户银行" prop="account_bank">
                                            <el-select v-model="payForm.account_bank" placeholder="请选择">
                                                <el-option v-for="item in banklist" :key="item.id" :label="item.name" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="开户银行省市编码" prop="bank_address_code">
                                            <el-cascader placeholder="试试搜索自己所在的省名" :options="cityOptions" filterable v-model="payForm.bank_address_code"></el-cascader>
                                        </el-form-item>
                                        <el-form-item label="开户银行全称（含支行）" prop="bank_name">
                                            <el-autocomplete v-model="payForm.bank_name" value-key="bank" :fetch-suggestions="querySearchBankAsync" placeholder="请输入开户银行全称（含支行）"></el-autocomplete>
                                        </el-form-item>
                                        <el-form-item label="银行卡号" prop="account_number">
                                            <el-input v-model="payForm.account_number"></el-input>
                                        </el-form-item>
                                    </div>
                                    <!-- 个人卡END -->
                                    <!-- 对公卡 -->
                                    <div v-if="isCorp">
                                        <el-form-item label="开户名">
                                            <el-input :disabled="true" v-model="createMiniAppForm.company_name" placeholder="开户名"></el-input>
                                        </el-form-item>
                                        <el-form-item label="对公户开户银行" prop="company_account_bank">
                                            <el-select v-model="payForm.company_account_bank" placeholder="请选择">
                                                <el-option v-for="item in banklist" :key="item.id" :label="item.name" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="对公户开户行省市编码" prop="company_bank_address_code">
                                            <el-cascader placeholder="试试搜索自己所在的省名" :options="cityOptions" filterable v-model="payForm.company_bank_address_code"></el-cascader>
                                        </el-form-item>
                                        <el-form-item v-if="isOtherBank" label="对公户银行全称（含支行）" prop="company_bank_name">
                                            <el-autocomplete v-model="payForm.company_bank_name" value-key="bank" :fetch-suggestions="querySearchBankAsync" placeholder="请输入开户银行全称（含支行）"></el-autocomplete>
                                        </el-form-item>
                                        <el-form-item label="对公户卡号" prop="company_account_number">
                                            <el-input v-model="payForm.company_account_number"></el-input>
                                        </el-form-item>
                                    </div>
                                    <!-- 个人卡END -->
                                </el-collapse-item>
                                <el-collapse-item title="申请" name="5">
                                    <el-form-item label="申请ID">
                                        {{payStatusForm.pay_applyment_id}}
                                        <el-button :loading="queryPayLoading" type="primary" @click="queryPay">查询申请状态</el-button>
                                    </el-form-item>
                                    <el-form-item label="申请状态">
                                        {{payStatusForm.pay_applyment_status|payApplymentStatusFilter}}
                                    </el-form-item>
                                    <el-form-item label="签约URL">
                                        <img :src="payStatusForm.pay_applyment_sign_url" />
                                    </el-form-item>
                                    <el-form-item label="申请消息">
                                        <div style="line-height:18px" v-html="payStatusForm.pay_applyment_msg"></div>
                                    </el-form-item>
                                </el-collapse-item>
                            </el-collapse>
                        </el-form>
                    </div>
                </el-col>
                <div class="bottom-button">
                    <el-row>
                        <el-col :span="24">
                            <el-button :loading="applyPayLoading" type="primary" @click="applyPay">申请支付</el-button>
                        </el-col>
                    </el-row>
                </div>

            </el-row>

        </el-tab-pane>
    </el-tabs>
    <appInfoDialog :show="appInfoDialogVisable" :appInfo="appInfo" v-on:appInfoDialogCloseMsg="appInfoDialogVisable = false">
    </appInfoDialog>
</div>
</template>

<script>
import appInfoDialog from "./components/appInfoDialog"
import validDatePicker from "./components/validDatePicker"
import {
    MiniAppOptCode,
    WxAppAuditStatus
} from "@config/config"
import OneImgUpload from "@commonComponents/OneImgUpload";
import {
    miniApp,
} from "@/config/api";
import {
    rules,
    city,
    banklist
} from "./components/Agreement";

export default {
    components: {
        OneImgUpload,
        appInfoDialog,
        validDatePicker,
    },
    data: () => ({
        srcArr: ['//pic.paitume.com/allCity.js'],
        activePayGroupName: ['1', '2', '3', '4', '5'],
        appInfo: null,
        appInfoDialogVisable: false,
        SelfMiniAppOptCode: MiniAppOptCode,
        SelfWxAppAuditStatus: WxAppAuditStatus,
        loading: false,
        optStatus: 0,
        createMiniAppForm: {
            organization_type: 2,
            legal_persona_wechat: null,
            legal_persona_name: null,
            company_name: null,
            business_license_number: "",
            wx_app_id: null,
            mini_app_msg: '',
            mini_app_status: 0,
        },
        setForm: {
            company_license_pic_qiniu: null,
            mini_app_name: null,
            info: null,
            name_audit_id: null,
            audit_version: null,
            audit_tpl_version: null,
            online_tpl_version: null,
            online_audit_id: null,
            online_version: null,
            last_tpl_version: null,
            mini_app_audit_id: null,
            mini_app_audit_status: null,
            mini_app_audit_msg: null,
            qr_code_url: null
        },
        payForm: {
            contact_phone: null,
            contact_email: null,
            id_card_number: null,
            id_card_copy_qiniu: null,
            id_card_national_qiniu: null,
            id_card_valid_time: null,

            service_phone: null,
            organization_number: null,
            organization_copy_qiniu: null,
            organization_time: null,

            bank_address_code: "",
            account_bank: "",
            bank_name: "",
            account_number: "",

            company_bank_address_code: "",
            company_account_bank: "",
            company_bank_name: "",
            company_account_number: "",
        },
        payStatusForm: {
            pay_applyment_id: "",
            pay_applyment_status: "",
            pay_applyment_msg: '',
            pay_applyment_msg_obj: [],
            pay_applyment_sign_url: "",
            pay_sub_mch_id: ""
        },
        organization_type_options: [{
                value: 2,
                label: "企业"
            },
            {
                value: 4,
                label: "个体户"
            }
        ],
        rules,
        banklist,
        banktimer: null,
        createMiniAppStatus: {
            init: 0,
            ing: 1,
            succ: 2,
            fail: 3,
            grant: 4
        },
        setDomainLoading: false,
        setWorkDomainLoading: false,
        setCategoryLoading: false,
        setNameLoading: false,
        queryNameLoading: false,
        setInfoLoading: false,
        setTplLoading: false,
        queryMiniAppInfoLoading: false,
        commitLoading: false,
        setIconLoading: false,
        createLoading: false,
        applyPayLoading: false,
        queryPayLoading: false,
        cityOptions: [],
        genQRLoading: false,
        activeProgress: 'createMiniApp',
        uid:null,
    }),

    created() {
        this.uid = this.$route.query.uid;
        this.getRequest(miniApp.getApply,{uid:this.uid}).then(res => {
            console.log(res);
            if (!this.util.isEmpty(res)) {
                //总表数据分几个FORM
                if (!this.util.isEmpty(res)) {
                    this.setData(res);
                    let progress = 'createMiniApp';
                    if (this.createMiniAppForm.mini_app_status == this.createMiniAppStatus.succ) {
                        //如果创建状态成功 
                        progress = 'setMiniApp';
                        //第三步支付配置没比较主动进去 支付成功一次 后面就不用配置了 常规操作都在第二步
                    }
                    this.activeProgress = progress;
                }

            }
        }).catch(err => {});
    },

    methods: {
        //加载城市js回调
        callbackFn() {
            console.log('##callbackFn')
            if (staticAllCityArray) {
                let _staticAllCityArray = staticAllCityArray;
                console.log('_staticAllCityArray  = ',_staticAllCityArray)
                let provinces = _staticAllCityArray.map(item => {
                    return item.province;
                });
                let provincesArr = [...new Set(provinces)];
                provincesArr = provincesArr.map(item => {
                    return {
                        label: item,
                        children: []
                    };
                });
                this.cityOptions = provincesArr.map(item => {
                    _staticAllCityArray.forEach(city => {
                        if (item.label === city.province) {
                            item.children.push({
                                label: city.city,
                                value: city.admin_code
                            });
                        }
                    });
                    return item;
                });
                console.log(this.cityOptions);
            }
        },
        querySearchBankAsync(queryString, cb) {
            console.log('querySearchBankAsync');
            if (this.util.isEmpty(queryString) || queryString.length < 3) {
                cb([])
            } else {
                this.getRequest('wx/searchBank', {
                    search: queryString
                }).then(res => {
                    if (res) {
                        cb(res);
                    }
                }).catch(err => {

                })
            }
        },
        //查询已经申请成功的小程序状态
        queryMiniAppInfo() {
            this.queryMiniAppInfoLoading = true;
            this.appInfoDialogVisable = true;
            this.getRequest(miniApp.queryMiniAppInfo,{uid:this.uid}).then(res => {
                this.queryMiniAppInfoLoading = false;
                if (res) {
                    if (res.errcode == 0) {
                        this.appInfo = res;
                        this.appInfoDialogVisable = true;
                    }
                }
            }).catch(err => {
                this.queryMiniAppInfoLoading = false;
            });
        },
        setData(res) {
            this.optStatus = res.opt_status;
            this.createMiniAppForm.mini_app_status = parseInt(res.mini_app_status);
            this.createMiniAppForm.mini_app_msg = res.mini_app_msg;
            this.createMiniAppForm.business_license_number = res.business_license_number;
            this.createMiniAppForm.legal_persona_wechat = res.legal_persona_wechat;
            this.createMiniAppForm.legal_persona_name = res.legal_persona_name;
            this.createMiniAppForm.company_name = res.company_name;
            this.createMiniAppForm.organization_type = parseInt(res.organization_type);
            this.createMiniAppForm.wx_app_id = this.util.isEmpty(res.wx_app_id) ? null : res.wx_app_id;

            this.setForm.company_license_pic_qiniu = res.company_license_pic_qiniu;
            this.setForm.mini_app_icon_qiniu = res.mini_app_icon_qiniu;
            this.setForm.mini_app_name = res.mini_app_name;
            this.setForm.name_audit_id = res.name_audit_id;
            this.setForm.info = res.info;
            this.setForm.audit_version = this.util.isEmpty(res.audit_version) ? '' : res.audit_version; //用户自定义Version
            this.setForm.audit_tpl_version = res.audit_tpl_version; //用户提交tpl版本
            this.setForm.online_tpl_version = res.online_tpl_version; //线上tpl版本
            this.setForm.online_audit_id = res.online_audit_id; //审核ID
            this.setForm.online_version = res.online_version; //线上自定义版本
            this.setForm.last_tpl_version = res.last_tpl_version; //系统最新模板库
            this.setForm.mini_app_audit_id = res.mini_app_audit_id; //当前审核ID
            this.setForm.mini_app_audit_msg = res.mini_app_audit_msg; //当前审核消息
            this.setForm.mini_app_audit_status = res.mini_app_audit_status; //当前审核状态
            this.setForm.qr_code_url = res.qr_code_url; //小程序码

            this.payForm.contact_phone = res.contact_phone,
                this.payForm.contact_email = res.contact_email,
                this.payForm.id_card_number = res.id_card_number,
                this.payForm.id_card_copy_qiniu = res.id_card_copy_qiniu,
                this.payForm.id_card_national_qiniu = res.id_card_national_qiniu,
                this.payForm.id_card_valid_time = res.id_card_valid_time,
                this.payForm.service_phone = res.service_phone,
                this.payForm.organization_number = res.organization_number;
            this.payForm.organization_time = res.organization_time;
            this.payForm.organization_copy_qiniu = res.organization_copy_qiniu;

            this.payForm.bank_address_code = res.bank_address_code;
            this.payForm.account_bank = res.account_bank;
            this.payForm.bank_name = res.bank_name;
            this.payForm.account_number = res.account_number;

            this.payForm.company_bank_address_code = res.company_bank_address_code;
            this.payForm.company_account_bank = res.company_account_bank;
            this.payForm.company_bank_name = res.company_bank_name;
            this.payForm.company_account_number = res.company_account_number;

            this.payStatusForm.pay_applyment_id = res.pay_applyment_id;
            this.payStatusForm.pay_applyment_status = res.pay_applyment_status;
            this.payStatusForm.pay_applyment_sign_url = res.pay_applyment_sign_url;
            this.payStatusForm.pay_sub_mch_id = res.pay_sub_mch_id;
            this.payStatusForm.pay_applyment_msg = res.pay_applyment_msg;
            this.payStatusForm.pay_applyment_msg_obj = JSON.parse(this.util.isEmpty(res.pay_applyment_msg) ? "[]" : res.pay_applyment_msg);
        },
        //查询创建状态
        getCreateStatus() {
            this.getRequest(miniApp.getCreateStatus,{uid:this.uid}).then(res => {
                if(res){
                    this.$message.info('查询成功');
                    this.setData(res);
                }
            }).catch(err => {})
        },
        //创建小程序
        createMiniApp() {
            if (this.disableCreate) {
                this.$message.warning('已经创建过,不能重复创建');
                return;
            }
            this.$refs.createMiniAppForm.validate((valid) => {
                if (valid) {
                    this.createLoading = true;
                    let p = this.createMiniAppForm;
                    p.uid = this.uid;
                    this.postRequest(miniApp.create, p).then(res => {
                        if (res) {
                            this.createLoading = false;
                            if (res) {
                                this.setData(res);
                            }
                        }
                    }).catch(err => {
                        this.createLoading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        //申请支付
        applyPay() {
            if (this.payStatusForm.pay_applyment_status == 'APPLYMENT_STATE_AUDITING') {
                this.$message.info('正在审核中');
                return;
            }
            if (this.payStatusForm.pay_applyment_status == 'APPLYMENT_STATE_TO_BE_CONFIRMED' || this.payStatusForm.pay_applyment_status == 'APPLYMENT_STATE_TO_BE_SIGNED') {
                this.$message.info('请扫下面的二维码完成签约');
                return;
            }
            if (this.payStatusForm.pay_applyment_status == 'APPLYMENT_STATE_SIGNING') {
                this.$message.info('系统开通相关权限中，请耐心等待');
                return;
            }
            if (this.payStatusForm.pay_applyment_status == 'APPLYMENT_STATE_FINISHED') {
                this.$message.info('已完成,无需重复申请');
                return;
            }
            this.$refs.payForm.validate(valid => {
                if (valid) {
                    this.applyPayLoading = true;
                    let p = this.payForm;
                    p = this.uid;
                    this.postRequest(miniApp.applyPay, this.payForm).then(res => {
                        this.applyPayLoading = false;
                        this.$message.info('申请成功,请耐心等待');
                        this.queryPay();

                    }).catch(err => {
                        this.applyPayLoading = false;
                    });
                } else {
                    console.log('提交pay验证失败');
                }
            });
        },
        //查询支付申请状态
        queryPay() {
            this.queryPayLoading = true;
            this.getRequest(miniApp.queryPay,{uid:this.uid}).then(res => {
                console.log(res);
                this.queryPayLoading = false;
                this.payStatusForm.pay_applyment_status = res.pay_applyment_status;
                this.payStatusForm.pay_applyment_sign_url = res.pay_applyment_sign_url;
                this.payStatusForm.pay_sub_mch_id = res.pay_sub_mch_id;
                this.payStatusForm.pay_applyment_msg = res.pay_applyment_msg;
                this.payStatusForm.pay_applyment_msg_obj = JSON.parse(res.pay_applyment_msg);

            }).catch(err => {
                this.queryPayLoading = false;
            })
        },
        //设置服务器
        setDomain() {
            if ((MiniAppOptCode.WxOptSetDomain & this.optStatus) > 0) {
                this.$message.info('已经成功，无需重复设置');
                return;
            }
            this.postRequest(MiniAppOptCode.setMiniAppDomain,{uid:this.uid}).then(res => {
                if (res) {
                    this.$message.info('设置成功');
                }
            }).catch(err => {});
        },
        //设置业务服务器
        setWorkDomain() {
            if ((MiniAppOptCode.WxOptSetWorkDomain & this.optStatus) > 0) {
                this.$message.info('已经成功，无需重复设置');
                return;
            }
            this.postRequest(MiniAppOptCode.setMiniAppWorkDomain,{uid:this.uid}).then(res => {
                if (res) {
                    this.$message.info('设置成功');
                }
            }).catch(err => {});
        },
        //设置类目
        setCategory() {
            if ((MiniAppOptCode.WxOptSetCategory & this.optStatus) > 0) {
                this.$message.info('已经成功，无需重复设置');
                return;
            }
            this.postRequest(MiniAppOptCode.setMiniAppCategory,{uid:this.uid}).then(res => {
                if (res) {
                    this.$message.info('设置类目成功');
                }
            }).catch(err => {});
        },
        //设置名称
        setName() {
            if (this.util.isEmpty(this.setForm.mini_app_name)) {
                this.$message.warning('名称不能为空');
                return;
            }
            if (this.util.isEmpty(this.setForm.company_license_pic_qiniu)) {
                this.$message.warning('名称依赖营业执照，请先上传营业执照');
                return;
            }
            alert('this.setNameLoading = false;');
            this.setNameLoading = true;
            this.postRequest(miniApp.setMiniAppName, {
                    mini_app_name: this.setForm.mini_app_name,
                    company_license_pic_qiniu: this.setForm.company_license_pic_qiniu,
                    uid:this.uid
                })
                .then(res => {
                    this.setNameLoading = false;
                    if (res) {
                        this.optStatus = res.opt_status;
                        this.setForm.name_audit_id = res.name_audit_id;
                        this.$message.info(res.msg);
                    }
                }).catch(err => {
                    this.setNameLoading = false;
                });
        },
        //查询小程序名字审核
        queryName() {
            if (this.setForm.name_audit_id == null || this.setForm.name_audit_id.length == 0) {
                this.$message.warning('没有审核ID');
                return;
            }
            this.queryNameLoading = true;
            this.postRequest(miniApp.queryNameAudit)
                .then(res => {
                    this.queryNameLoading = false;
                    if (res) {
                        this.optStatus = res.opt_status;
                        if (res.errcode == 0) {
                            this.$message.info('成功');
                            this.setForm.name_audit_id = '';
                        } else {
                            this.$message.error(res.fail_reason);
                        }
                    }
                }).catch(err => {
                    this.queryNameLoading = false;
                });

        },
        //设置小程序描述
        setInfo() {
            if (this.util.isEmpty(this.setForm.mini_app_name)) {
                this.$message.warning('描述不能为空');
                return;
            }
            this.postRequest(miniApp.setMiniAppInfo, {
                info: this.setForm.info
            }).then(res => {
                if (res) {
                    this.$message.info('设置描述成功');
                    this.queryOptStatus();
                }
            }).catch(err => {
                this.queryOptStatus();
            });
        },
        //获取optStatus
        queryOptStatus() {
            this.postRequest(miniApp.queryOptStatus,{uid:this.uid}).then(res => {
                if (res) {
                    this.optStatus = res;
                }
            }).catch(err => {})
        },
        //设置模板
        setTpl() {
            if (this.util.isEmpty(this.setForm.audit_version)) {
                this.$message.warning('自定义版本号不能为空');
                return;
            }
            this.postRequest(miniApp.setMiniAppTpl, {
                audit_version: this.setForm.audit_version,
                uid:this.uid
            }).then(res => {
                if (res) {
                    this.$message.info('设置成功');
                    this.optStatus = res.opt_status;
                }
            }).catch(err => {});
        },
        //设置icon
        setIcon() {
            if (this.util.isEmpty(this.setForm.mini_app_icon_qiniu)) {
                this.$message.warning('ICON不能为空');
                return;
            }
            this.setIconLoading = true;
            this.postRequest(miniApp.setMiniAppIcon, {
                mini_app_icon_qiniu: this.setForm.mini_app_icon_qiniu,
                uid:this.uid
            }).then(res => {
                this.setIconLoading = false;
                if (res) {
                    this.$message.info('设置ICON成功');
                    this.queryOptStatus();
                }
            }).catch(err => {
                this.setIconLoading = false;
                this.queryOptStatus();
            });
        },
        //提交审核
        setCommit() {
            this.commitLoading = true;
            this.postRequest(miniApp.setMiniAppCommit,{uid:this.uid}).then(res => {
                this.commitLoading = false;
                if (res) {
                    //成功返回审核ID 改状态 清消息
                    this.setForm.mini_app_audit_id = res;
                    this.setForm.mini_app_audit_status = SelfWxAppAuditStatus.WxAppAuditStatusIng;
                    this.setForm.mini_app_audit_msg = '';
                }
            }).catch(err => {
                this.commitLoading = false;
            });
        },
        //查询审核状态
        queryCommit() {
            this.commitLoading = true;
            this.postRequest(miniApp.queryLastAuditStatus,{uid:this.uid}).then(res => {
                this.commitLoading = false;
                if (res) {
                    this.setForm.mini_app_audit_id = res.mini_app_audit_id;
                    this.setForm.mini_app_audit_status = res.mini_app_audit_status;
                    this.setForm.mini_app_audit_msg = res.mini_app_audit_msg;
                    this.optStatus = res.opt_status;
                }
            }).catch(err => {
                this.commitLoading = false;
            });
        },
        //手动发布 正常自动发布
        releaseCommit() {
            this.commitLoading = true;
            this.postRequest(miniApp.setMiniAppRelease,{uid:this.uid}).then(res => {
                this.commitLoading = false;
                if (res) {
                    this.setData(res);
                }
            }).catch(err => {
                this.commitLoading = false;
            });
        },
        //生成二维码
        genQR() {
            this.genQRLoading = true;
            this.getRequest(miniApp.genQR,{uid:this.uid}).then(res => {
                this.genQRLoading = false;
                if (res) {
                    this.setForm.qr_code_url = res + '?v=' + new Date(new Date().toLocaleDateString()).getTime();
                }

            }).catch(err => {
                this.genQRLoading = false;
            });
        }
    },
    computed: {
        disableCreate() {
            if (this.createMiniAppForm.wx_app_id == null) {
                return false;
            }
            return true;
        },
        isPersonal() {
            //是否个体户
            return this.createMiniAppForm.organization_type == 4
        },
        isCorp() {
            //是否企业
            return this.createMiniAppForm.organization_type == 2
        },
        needOrg() {
            //是否需要组织机构代码证
            if (this.createMiniAppForm.business_license_number) {
                return this.createMiniAppForm.business_license_number.length == 15;
            }
            return false;
        },
        isOtherBank() {
            return this.payForm.company_account_bank == '其他银行';
        },

    },
    filters: {
        miniAppStatusFilter(status, statusOption) {
            if (status == statusOption.init) {
                return '未创建';
            } else if (status == statusOption.ing) {
                return '创建中';
            } else if (status == statusOption.succ) {
                return '成功';
            } else if (status == statusOption.fail) {
                return '失败';
            }
        },
        optFilter(optStatus, targetOptStatus) {
            if ((targetOptStatus & optStatus) > 0) {
                return '成功'
            }
            return '未提交或失败';
        },
        auditStatusFilter(status, statusOption) {
            if (status == statusOption.WxAppAuditStatusSucc) {
                return '成功';
            } else if (status == statusOption.WxAppAuditStatusFail) {
                return '失败';
            } else if (status == statusOption.WxAppAuditStatusIng) {
                return '审核中';
            } else if (status == statusOption.WxAppAuditStatusCancel) {
                return '撤回';
            } else if (status == statusOption.WxAppAuditStatusInit) {
                return '未提交';
            }
            return '未知';
        },
        payApplymentStatusFilter(status) {
            if (status == 'APPLYMENT_STATE_EDITTING') {
                return '编辑中：提交申请发生错误导致，请尝试重新提交。';
            } else if (status == 'APPLYMENT_STATE_AUDITING') {
                return '审核中：申请单正在审核中，超级管理员用微信打开“签约链接”，完成绑定微信号后，申请单进度将通过微信公众号通知超级管理员，引导完成后续步骤。';
            } else if (status == 'APPLYMENT_STATE_REJECTED') {
                return '已驳回：请按照驳回原因修改申请资料，超级管理员用微信打开“签约链接”，完成绑定微信号，后续申请单进度将通过微信公众号通知超级管理员。';
            } else if (status == 'APPLYMENT_STATE_TO_BE_CONFIRMED') {
                return '待账户验证：请超级管理员使用微信打开返回的“签约链接”，根据页面指引完成账户验证。';
            } else if (status == 'APPLYMENT_STATE_TO_BE_SIGNED') {
                return '待签约：请超级管理员使用微信打开返回的“签约链接”，根据页面指引完成账户验证。';
            } else if (status == 'APPLYMENT_STATE_SIGNING') {
                return '开通权限中：系统开通相关权限中，请耐心等待。';
            } else if (status == 'APPLYMENT_STATE_FINISHED') {
                return '已完成：商户入驻申请已完成。';
            } else if (status == 'APPLYMENT_STATE_FINISHED') {
                return '已作废：申请单已被撤销。';
            }

            return '无';
        }
    }
};
</script>

<style lang="scss" scoped>
.form-box {
    background-color: #fff;
    padding: 36px;

    .bottom-button {
        margin-top: 2%;
        justify-content: center;
    }

    .bank-box {
        display: flex;

        .bankclass {
            width: 100%;
            margin-left: 20px;

            /deep/ .el-form-item__label {
                width: 220px !important;
            }

            /deep/ .el-autocomplete {
                width: 93%;
            }
        }
    }

    .company {
        display: flex;

        /deep/ .el-select {
            flex: 2;
            margin-right: 20px;
        }

        /deep/ .el-input {
            flex: 9;
        }
    }

    /deep/ .el-range-separator {
        padding: 0;
    }
}

.license-img {
    /deep/ .el-upload {
        width: 98px;
    }
}

.success {
    margin-top: 20px;
    text-align: center;

    .text {
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0px;
    }
}

.el-autocomplete {
    width: 100%;
}

.el-cascader {
    width: 60%;
}
/deep/.el-tabs__item{
    color: #333;
}
</style>
