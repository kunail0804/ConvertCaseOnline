window.onload = function() {
    document.getElementById("upperCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        textArea.value = textArea.value.toUpperCase();
    });
}