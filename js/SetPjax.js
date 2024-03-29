var pjax = new Pjax({
    selectors: [
        "head title",
        ".columns",
        ".navbar-start",
        ".searchbox",
        "#back-to-top",
        ".pjax-reload"
    ],
});

// 包含一些 Pjax 加载后需要重新执行的函数
function pjax_reload() {
    SetupGiscus(getCurrentLanguage());
}

// 监听 Pjax 完成后，重新加载上面的函数
document.addEventListener("pjax:complete", function () {
    pjax_reload();
});