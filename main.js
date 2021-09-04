// ==UserScript==
// @name         Niconico Easy Kusa
// @namespace    https://greasyfork.org/ja/users/808813
// @version      1.0
// @description  ニコニコ動画のかんたんコメントをカスタマイズします。
// @author       蝙蝠の目
// @license      MIT
// @supportURL   https://twitter.com/intent/tweet?screen_name=kumrnm
// @match        https://nicovideo.jp/watch/*
// ==/UserScript==

(() => {
    "use strict";

    init();

    function init() {
        const container = document.querySelector(".EasyCommentContainer-easyComments");
        container.append(createCommentButton("草"));
    }

    function createCommentButton(text) {
        const button = document.createElement("button");
        button.classList.add("ActionButton");
        button.classList.add("EasyCommentButton");
        const caption = document.createElement("div");
        caption.classList.add("EasyCommentButton-caption");
        caption.textContent = text;
        button.append(caption);

        button.addEventListener("click", () => sendComment(text));

        return button;
    }

    async function sendComment(text) {
        const commandInput = document.querySelector(".CommentCommandInput");
        const commentInput = document.querySelector(".CommentInput-textarea");

        const command0 = commandInput.value;
        const comment0 = commentInput.value;

        commentInput.value = text;
        getReactHandler(commentInput, "onChange")({ target: commentInput });

        if (command0) {
            commandInput.value = "";
            getReactHandler(commandInput, "onChange")({ target: commandInput });
            await wait(15);
        }

        document.querySelector(".CommentPostButton").click();

        await wait(2);

        commandInput.value = command0;
        commentInput.value = comment0;
        getReactHandler(commandInput, "onChange")({ target: commandInput });
        getReactHandler(commentInput, "onChange")({ target: commentInput });
    }

    function getReactHandler(element, handlerName) {
        for (const x in element) {
            if (typeof x === "string" && x.indexOf("reactEventHandlers") >= 0) {
                return element[x][handlerName];
            }
        }
    }

    function animationFramePromise() {
        return new Promise(resolve => window.requestAnimationFrame(resolve));
    }

    async function wait(frames) {
        for (let i = 0; i < frames; ++i) await animationFramePromise();
    }

})();
