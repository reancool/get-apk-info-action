const core = require('@actions/core');
const AppInfoParser = require('app-info-parser');

async function main() {
    try {
        // inputs from action
        const apkPath = core.getInput('apkPath');

        console.log(apkPath);

        const parser = new AppInfoParser(apkPath);// or xxx.ipa
        parser.parse().then(result => {

            core.setOutput("versionCode", result.versionCode);
            core.setOutput("versionNum", result.versionName);
            core.setOutput("applicationId", result.package);
            core.setOutput("name", result.application.label);
            core.setOutput("buildDate",  getDate());
           
            console.log('app info ----> ', result);

        }).catch(err => {
            console.log('err ----> ', err)
        });
    } catch (error) {
        console.log('catch error ----> ', error);
        core.setFailed(error.message);
    }
}
function getDate(){
    var timezone = 8; 
    var offset_GMT = new Date().getTimezoneOffset();
    var nowDate = new Date().getTime(); 
    var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
    var date = new Date(targetDate);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    return y + '_' + m + '_' + d+'_'+h+'-'+minute+'-'+second;
}

main();
