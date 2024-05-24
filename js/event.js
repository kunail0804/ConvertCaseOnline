window.onload = function() {
    var nbCar = document.getElementById("nbCar");
    var nbMots = document.getElementById("nbMots");
    var nbLigne = document.getElementById("nbLigne");
    var nbSentence = document.getElementById("nbSentence");

    function copyToClipboard() {
        var textArea = document.getElementById("textArea");
        navigator.clipboard.writeText(textArea.value).then(function() {
          console.log("Copying to clipboard was successful!");
          // Mettre à jour le contenu de la div avec le message
          var messageDiv = document.getElementById("message");
          messageDiv.textContent = "Le texte a été copié dans le presse-papiers !";
    
          // Ajouter une classe pour l'animation (optionnel)
          messageDiv.classList.add("show");
    
          // Supprimer la classe pour l'animation après un certain temps (optionnel)
          setTimeout(function() {
            messageDiv.classList.remove("show");
          }, 3000); // 3 secondes par exemple
        }, function(err) {
          console.error("Could not copy text: ", err);
        });
      }
    
    // UpperCase button
    document.getElementById("upperCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        textArea.value = textArea.value.toUpperCase();
        copyToClipboard();
    });
    
    // LowerCase button
    document.getElementById("lowerCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        textArea.value = textArea.value.toLowerCase();
        copyToClipboard();
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
        copyToClipboard();
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
        copyToClipboard();
    });
    
    // InverseCase button
    document.getElementById("inverseCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        var text = textArea.value;
        var invertedText = '';
    
        for (var i = 0; i < text.length; i++) {
            var char = text[i];
            if (char === char.toUpperCase()) {
                invertedText += char.toLowerCase();
            } else {
                invertedText += char.toUpperCase();
            }
        }
    
        textArea.value = invertedText;
        copyToClipboard();
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
        copyToClipboard();
    });

    // Clear button
    document.getElementById("clear").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        textArea.value = '';
        nbCar.textContent = 0;
        nbMots.textContent = 0;
        nbLigne.textContent = 0;
        nbSentence.textContent = 0;
    });

    // ----------------Counters
    var textArea = document.getElementById("textArea");

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