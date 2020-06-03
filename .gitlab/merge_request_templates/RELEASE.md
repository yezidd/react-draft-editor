#### 自动发布

<!-- openReleaseNotice -->

- [x] 发布确认通知
  <!-- openReleaseCleanBranch -->
- [x] 发布后清理
  <!-- openReleaseBuild -->
- [ ] 发布后构建(提审)
  <!-- postReleaseScripts -->
- 合并后执行脚本：release

<!--
说明：
 1. 发布确认通知开启后可自动生成 MR 描述，并在企业微信通知相关同学确认
 2. 发布后清理会在MR合并后清除已合并分支
 3. 合并后执行脚本： 在 MR 合并后将会执行指定的 package.json scripts 中的脚本
 4. web 项目在发布后会自动构建，小程序项目发布后会自动提审
 -->
