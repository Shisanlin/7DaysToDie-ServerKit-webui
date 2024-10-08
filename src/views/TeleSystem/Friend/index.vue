<template>
    <div class="teleport-friend-settings">
        <RouterButton :names="['teleSystem.friend']"></RouterButton>
        <el-card shadow="always" class="card">
            <el-scrollbar always>
                <div style="margin-right: 16px">
                    <el-form :model="formModel" :rules="rules" ref="formRef" label-width="200px" status-icon>
                        <el-form-item label="是否启用">
                            <el-switch v-model="formModel.isEnabled" />
                        </el-form-item>
                        <el-form-item label="可用变量">
                            <el-tag v-for="(item, index) in variables" :key="index" class="tag">{{ '{' + item + '}' }}</el-tag>
                        </el-form-item>
                        <el-form-item label="传送命令" prop="teleCmdPrefix">
                            <el-input v-model="formModel.teleCmdPrefix" />
                        </el-form-item>
                        <el-form-item label="传送间隔 (单位: 秒)" prop="teleInterval">
                            <el-input-number v-model="formModel.teleInterval" />
                        </el-form-item>
                        <el-form-item label="需要积分" prop="pointsRequired">
                            <el-input-number v-model="formModel.pointsRequired" />
                        </el-form-item>
                        <el-form-item label="传送成功提示" prop="teleSuccessTip">
                            <el-input v-model="formModel.teleSuccessTip" />
                        </el-form-item>
                        <el-form-item label="积分不足提示" prop="pointsNotEnoughTip">
                            <el-input v-model="formModel.pointsNotEnoughTip" />
                        </el-form-item>
                        <el-form-item label="正在冷却提示" prop="coolingTip">
                            <el-input v-model="formModel.coolingTip" />
                        </el-form-item>
                        <el-form-item label="传送目标没有找到提示" prop="targetNotFoundTip">
                            <el-input v-model="formModel.targetNotFoundTip" />
                        </el-form-item>
                        <el-form-item label="传送目标不是您的好友提示" prop="targetNotFriendTip">
                            <el-input v-model="formModel.targetNotFriendTip" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="save">{{ $t('global.button.save') }}</el-button>
                            <el-button type="danger" @click="reset">{{ $t('global.button.reset') }}</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-text style="color: green">提示: 游戏内输入tele+横杠(-)+好友名称 进行传送</el-text>
                    </div>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'teleSystem.friend',
};
</script>

<script setup>
import * as api from '~/api/settings.js';

const formModel = reactive({});
const formRef = ref();
const localeStore = useLocaleStore();
const getData = async () => {
    const data = await api.getSettings('TeleportFriend', localeStore.getLanguage());
    Object.assign(formModel, data);
};
getData();

const save = async () => {
    try {
        await formRef.value.validate();
        await api.updateSettings('TeleportFriend', formModel);
        ElMessage.success(t('global.message.saveSuccess'));
    } catch {}
};

const reset = async () => {
    try {
        if (await myconfirm(t('global.message.resetConfirm'))) {
            await api.resetSettings('TeleportFriend', localeStore.getLanguage());
            await getData();
            ElMessage.success(t('global.message.resetSuccess'));
        }
    } catch {}
};

const variables = ['TeleInterval', 'PointsRequired', 'TargetName', 'CooldownSeconds', 'EntityId', 'PlayerId', 'PlayerName'];

const rules = {
    teleCmdPrefix: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    teleInterval: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    pointsRequired: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    teleSuccessTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    pointsNotEnoughTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    coolingTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    targetNotFoundTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
    targetNotFriendTip: [{ required: true, message: t('global.formRule.required'), trigger: 'blur' }],
};
</script>

<style scoped lang="scss">
.teleport-friend-settings {
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
