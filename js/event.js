window.onload = function() {
    // UpperCase button
    document.getElementById("upperCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        textArea.value = textArea.value.toUpperCase();
    });

    // LowerCase button
    document.getElementById("lowerCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        textArea.value = textArea.value.toLowerCase();
    });

    // SentenceCase button
    document.getElementById("sentenceCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        var sentences = textArea.value.split('.');
        for(var i = 0; i < sentences.length; i++) {
            sentences[i] = sentences[i].trim();
            if(sentences[i]) {
                sentences[i] = sentences[i][0].toUpperCase() + sentences[i].slice(1);
            }
        }
        textArea.value = sentences.join('. ');
    });

    // TitleCase button
    document.getElementById("titleCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        var words = textArea.value.split(' ');
        for(var i = 0; i < words.length; i++) {
            words[i] = words[i].trim();
            if(words[i]) {
                words[i] = words[i][0].toUpperCase() + words[i].slice(1);
            }
        }
        textArea.value = words.join(' ');
    });

    // InverseCase buttons
    document.getElementById("inverseCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        var words = textArea.value.split(' ');
        for(var i = 0; i < words.length; i++) {
            words[i] = words[i].trim();
            if(words[i]) {
                words[i] = words[i][0].toLowerCase() + words[i].slice(1).toUpperCase();
            }
        }
        textArea.value = words.join(' ');
    });

    // AlternatingCase button
    document.getElementById("alternatingCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        var words = textArea.value.split(' ');
        for(var i = 0; i < words.length; i++) {
            words[i] = words[i].trim();
            if(words[i]) {
                var letters = words[i].split('');
                for(var j = 0; j < letters.length; j++) {
                    letters[j] = (j % 2 == 0) ? letters[j].toUpperCase() : letters[j].toLowerCase();
                }
                words[i] = letters.join('');
            }
        }
        textArea.value = words.join(' ');
    });

    // Download button
    document.getElementById("download").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textArea.value));
        element.setAttribute('download', "CaseConverter.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });

    // Copy button
    document.getElementById("copy").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        navigator.clipboard.writeText(textArea.value).then(function() {
            console.log('Copying to clipboard was successful!');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    });

    // Clear button
    document.getElementById("clear").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        textArea.value = '';
    });

    // ----------------Counters
    var textArea = document.getElementById("textArea");
    var nbCar = document.getElementById("nbCar");
    var nbMots = document.getElementById("nbMots");
    var nbLigne = document.getElementById("nbLigne");
    var nbSentence = document.getElementById("nbSentence");

    // nbCar
    textArea.addEventListener("input", function() {
        nbCar.textContent = textArea.value.length;
    });

    // nbMots
    textArea.addEventListener("input", function() {
        var words = textArea.value.split(/[\s,.]+/).filter(function(word) {
            return word.length > 0;
        });
        nbMots.textContent = words.length;
    });

    // nbLigne
    textArea.addEventListener("input", function() {
        if (textArea.value.trim() === '') {
            nbLigne.textContent = 0;
        } else {
            var lines = textArea.value.split(/\r\n|\r|\n/);
            nbLigne.textContent = lines.length;
        }
    });

    // nbSentence
    textArea.addEventListener("input", function() {
        var sentences = textArea.value.split('.').filter(function(sentence) {
            return sentence.trim().length > 0;
        });
        nbSentence.textContent = sentences.length;
    });
}