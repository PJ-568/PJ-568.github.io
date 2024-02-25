try{
    translate.listener.start();
    translate.language.setLocal('chinese_simplified');
    translate.setAutoDiscriminateLocalLanguage();
    translate.language.setUrlParamControl();
    translate.ignore.class.push('notTranslate');
}
catch(e){console.log(e);}
translate.nomenclature.append('chinese_simplified','english',`
    刘甜=Liu Tian
    主页=Home
    知乎=Zhihu
    友链=Links
    爱发电=Create by love
    送我杯咖啡=Buy me a tea
    哈姆语言之书=Hamud Book
    哈姆语=the language of Hamud
    哈姆=Hamud
`);
translate.execute();