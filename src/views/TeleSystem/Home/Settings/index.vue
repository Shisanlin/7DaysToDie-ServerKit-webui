<template>
    <div class="teleport-home-settings">
        <RouterButton :names="['teleSystem.home.settings', 'teleSystem.home.management']"></RouterButton>
        <el-card shadow="always" class="card">
            <el-scrollbar always>
                <div style="margin-right: 16px">
                    <el-form :model="formModel" :rules="rules" ref="formRef" label-width="150px" status-icon>
                        <el-form-item label="是否启用" prop="isEnabled">
                            <el-switch v-model="formModel.isEnabled" />
                        </el-form-item>
                        <el-form-item label="可用变量">
                            <el-tag v-for="(item, index) in variables" :key="index" class="tag">{{ '{' + item + '}' }}</el-tag>
                        </el-form-item>
                        <el-form-item label="查询Home列表命令" prop="queryListCmd">
                            <el-input v-model="formModel.queryListCmd" />
                        </el-form-item>
                        <el-form-item label="传送间隔, 单位: 秒" prop="teleInterval">
                            <el-input-number v-model="formModel.teleInterval" />
                        </el-form-item>
                        <el-form-item label="设置Home命令前缀" prop="setHomeCmdPrefix">
                            <el-input v-model="formModel.setHomeCmdPrefix" />
                        </el-form-item>
                        <el-form-item label="最大可设置数量" prop="setCountLimit">
                            <el-input-number v-model="formModel.setCountLimit" />
                        </el-form-item>
                        <el-form-item label="设置需要积分" prop="pointsRequiredForSet">
                            <el-input-number v-model="formModel.pointsRequiredForSet" />
                        </el-form-item>
                        <el-form-item label="删除Home命令前缀" prop="deleteHomeCmdPrefix">
                            <el-input v-model="formModel.deleteHomeCmdPrefix" />
                        </el-form-item>
                        <el-form-item label="传送Home命令前缀" prop="teleHomeCmdPrefix">
                            <el-input v-model="formModel.teleHomeCmdPrefix" />
                        </el-form-item>
                        <el-form-item label="传送需要积分" prop="pointsRequiredForTele">
                            <el-input-number v-model="formModel.pointsRequiredForTele" />
                        </el-form-item>
                        <el-form-item label="没有Home提示" prop="noHomeTip">
                            <el-input v-model="formModel.noHomeTip" />
                        </el-form-item>
                        <el-form-item label="查询列表提示" prop="locationItemTip">
                            <el-input v-model="formModel.locationItemTip" />
                        </el-form-item>
                        <el-form-item label="超出限制提示" prop="overLimitTip">
                            <el-input v-model="formModel.overLimitTip" />
                        </el-form-item>
                        <el-form-item label="设置积分不足提示" prop="setPointsNotEnoughTip">
                            <el-input v-model="formModel.setPointsNotEnoughTip" />
                        </el-form-item>
                        <el-form-item label="设置成功提示" prop="setSuccessTip">
                            <el-input v-model="formModel.setSuccessTip" />
                        </el-form-item>
                        <el-form-item label="覆盖成功提示" prop="overwriteSuccessTip">
                            <el-input v-model="formModel.overwriteSuccessTip" />
                        </el-form-item>
                        <el-form-item label="删除成功提示" prop="deleteSuccessTip">
                            <el-input v-model="formModel.deleteSuccessTip" />
                        </el-form-item>
                        <el-form-item label="Home没有找到提示" prop="homeNotFoundTip">
                            <el-input v-model="formModel.homeNotFoundTip" />
                        </el-form-item>
                        <el-form-item label="正在冷却提示" prop="coolingTip">
                            <el-input v-model="formModel.coolingTip" />
                        </el-form-item>
                        <el-form-item label="传送积分不足提示" prop="telePointsNotEnoughTip">
                            <el-input v-model="formModel.telePointsNotEnoughTip" />
                        </el-form-item>
                        <el-form-item label="传送成功提示" prop="teleSuccessTip">
                            <el-input v-model="formModel.teleSuccessTip" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="save">{{ $t('global.button.save') }}</el-button>
                            <el-button type="danger" @click="reset">{{ $t('global.button.reset') }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-text style="color: green">提示: 游戏内输入setHome+横杠(-)+home名称 保存当前坐标, 输入delHome+横杠(-)+home名称 删除home</el-text>
                    </div>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'teleSystem.home.settings',
};
</script>

<script setup>
import * as api from '~/api/settings.js';


const formModel = reactive({});
const formRef = ref();
const localeStore = useLocaleStore();
const getData = async () => {
    const data = await api.getSettings('TeleportHome', localeStore.getLanguage());
    Object.assign(formModel, data);
};
getData();

const save = async () => {
    try {
        await formRef.value.validate();
        await api.updateSettings('TeleportHome', formModel);
        ElMessage.success(t('global.message.saveSuccess'));
    } catch {}
};

const reset = async () => {
    try {
        if (await myconfirm(t('global.message.resetConfirm'))) {
            await api.resetSettings('TeleportHome', localeStore.getLanguage());
            await getData();
            ElMessage.success(t('global.message.resetSuccess'));
        }
    } catch {}
};

const variables = ['HomeName', 'TeleInterval', 'CooldownSeconds', 'EntityId', 'PlayerId', 'PlayerName'];

const rules = {
    queryListCmd: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    teleInterval: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    setHomeCmdPrefix: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    setCountLimit: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    pointsRequiredForSet: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    deleteHomeCmdPrefix: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    teleHomeCmdPrefix: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    pointsRequiredForTele: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    noHomeTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    locationItemTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    overLimitTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    setPointsNotEnoughTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    setSuccessTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    overwriteSuccessTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    deleteSuccessTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    homeNotFoundTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    coolingTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    telePointsNotEnoughTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    teleSuccessTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
};
</script>

<style scoped lang="scss">
.teleport-home-settings {
    .card {
        margin-top: 20px;
        background-color: #ffffffaf;
        :deep(.el-card__body) {
            height: calc(100vh - 200px);
        }

        .label {
            :deep(.el-form-item__label) {
                word-break: break-all;
                white-space: pre-wrap;
            }
        }
    }
}
</style>
