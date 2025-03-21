module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        productName: "阅卷系统管理端",
        appId: "com.marking.system.admin",
        win: {
          icon: 'public/icon.ico'
        }
      }
    }
  }
}