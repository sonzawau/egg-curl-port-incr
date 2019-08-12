const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '10s', // 1 分钟间隔
            type: 'worker', // 指定所有的 worker 都需要执行
            immediate: true,
            //disable:true
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        //let destData = await this.ctx.service.dataQueryService.GetDataqueryById("0952dda0-7d1d-11e9-9f28-4d473cd910b0");

        let resultDest = await this.ctx.curl('http://www.baidu.com', {
            gzip: true,
            timeout: 100000,
            timing: true
        });
        if (resultDest.status === 200) {
            let dataArray = resultDest.res.data;
            let dataobj = {
                CachedKey: "{\"url\":\"86267f60-81e3-11e9-bbc3-231f46191c24\",\"param\":{\"fields\":{}}}",
                CachedValue: dataArray,
                ExpireTime: new Date(Date.now() + 6000000000)
            };
           
        }
    }
}

module.exports = UpdateCache;