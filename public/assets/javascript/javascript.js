$(document).ready(function () {

    $("#commentButton").on("click", function (e) {
        e.preventDefault();
        $("#commentModal").modal('toggle');
    });

    $("#modalSubmit").on("click", function (e) {
        var articleId = $(this).data("id");

        $.ajax({
            method: "POST",
            url: "/add/comments/" + articleId,
            data: {
                name: $("#name").val(),
                // takes values from note textarea
                comment: $("#comment").val()
            }
        })
            .done(function (data) {
                console.log(data);
                $("#commentModal").modal('hide');
            });

    });

});