$(document).ready(function () {
    let page = new URLSearchParams(window.location.search);
    let path = $(location).attr("href");
    // let lastPage = parseInt($(".last").text());
    let url = new URL(path);
    let position;

    {
        page = parseInt(page.get("page"));
        page = isNaN(page) ? 1 : page;
        setPagesValues(lastPage);
        pagesAnimation();
    }

    $(".page").not(".selected").click(function () {
        url.searchParams.set("page", parseInt($(this).text()));
        page = parseInt($(this).text());
        window.history.replaceState("", "", url);
        pagesAnimation();
    })

    $(".first").click(function () {
        url.searchParams.set("page", 1);
        page = 1;
        window.history.replaceState("", "", url);
        pagesAnimation();
    })

    $(".last").click(function () {
        url.searchParams.set("page", lastPage);
        page = lastPage;
        window.history.replaceState("", "", url);
        pagesAnimation();
    })

    $("#arrow-left").click(function () {
        if (page !== 1) {
            page--;
            url.searchParams.set("page", page);
            window.history.replaceState("", "", url);
            pagesAnimation();
        }
    })

    $("#arrow-right").click(function () {
        if (page !== lastPage) {
            page++;
            url.searchParams.set("page", page);
            window.history.replaceState("", "", url);
            pagesAnimation();
        }
    })

    $(".page, .first, .last").mouseover(function () {
        let newPos = parseInt($(".pages").find("div:visible").index($(this))) - 1;
        $(".line").find(".underline").css("left", newPos * 32 + "px");
    })

    $(".pages").mouseleave(function () {
        $(".line").find(".underline").css("left", position * 32 + "px");
    })

    function pagesAnimation() {
        if (page <= 4) {
            if (page <= 3) {
                $(".first").css("display", "none");
                $(".page").last().css("display", "none");
            } else {
                $(".first").css("display", "inline-block");
                $(".page").last().css("display", "inline-block");
            }
            $(".first-dots").css("display", "none");
        } else {
            $(".first").css("display", "inline-block");
            $(".page").last().css("display", "inline-block");
            $(".first-dots").css("display", "inline-block");
        }

        if (page > lastPage - 4) {
            if (page > lastPage - 3) {
                $(".last").css("display", "none");
                $(".page").first().css("display", "none");
            } else {
                $(".last").css("display", "inline-block");
                $(".page").first().css("display", "inline-block");
            }
            $(".last-dots").css("display", "none");
        } else {
            $(".last").css("display", "inline-block");
            $(".page").first().css("display", "inline-block");
            $(".last-dots").css("display", "inline-block");
        }

        let pages = page - 2;
        $(".pages").find(".page").each(function () {
            if (pages <= 0 || pages > lastPage) {
                $(this).css("display", "none");
            } else {
                $(this).css("display", "inline-block");
            }

            $(this).text(pages++);
        })

        $(".pages").css("width", (($(".pages").find("div:visible").length - 2) * 32 + 124) + "px");
        $(".line").css("width", (($(".pages").find("div:visible").length - 2) * 32) + "px");
        position = parseInt($(".pages").find("div:visible").index($(".pages").find(".selected"))) - 1;
        $(".line").find(".underline").css("left", position * 32 + "px");
        setTimeout(function () {
            $(".line").find(".underline").css("transition", "left 0.3s ease-in-out");
        }, 100)
    }

    function setPagesValues(lastPageNumber) {
        let pagesElement = '<div class="pages-container"><div class="pages"><div id="arrow-left"></div><div class="first">' +
            '1</div><div class="first-dots">...</div>';
        for (let i = page - 2; i <= page + 2; i++) {
            pagesElement += '<div class="page' + ((i == page) ? ' selected' : '') + '">' + i + '</div>';
        }
        pagesElement += '<div class="last-dots">...</div><div class="last">' + lastPageNumber + '</div>' +
            '<div id="arrow-right"></div></div><div class="line"><div class="underline"></div></div></div>';
        $("#pages").html(pagesElement);
    }
})