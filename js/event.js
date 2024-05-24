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
    
      function removeFormatting(text) {
        var formats = [];
        text = text.replace(/(<\/?h[1-3]>|<\/?p>)/g, function(match, p1, offset) {
            formats.push({format: p1, position: offset});
            return '';
        });
        return {text: text, formats: formats};
    }
    
    function applyFormatting(data) {
        var text = data.text;
        var formats = data.formats;
        for (var i = 0; i < formats.length; i++) {
            text = text.substring(0, formats[i].position) + formats[i].format + text.substring(formats[i].position);
        }
        return text;
    }
    
    // UpperCase button
    document.getElementById("upperCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        
        var data = removeFormatting(textArea.value);
        data.text = data.text.toUpperCase();
        textArea.value = applyFormatting(data);
        copyToClipboard();
    });
    
    // LowerCase button
    document.getElementById("lowerCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        
        var data = removeFormatting(textArea.value);
        data.text = data.text.toLowerCase();
        textArea.value = applyFormatting(data);
        copyToClipboard();
    });

    // SentenceCase button
    document.getElementById("sentenceCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        
        var data = removeFormatting(textArea.value);
        data.text = data.text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function(c){ return c.toUpperCase(); });
        textArea.value = applyFormatting(data);
        copyToClipboard();
    });

    // TitleCase button
    document.getElementById("titleCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        
        var data = removeFormatting(textArea.value);
        var words = data.text.split(' ');
        for(var i = 0; i < words.length; i++) {
            words[i] = words[i].trim();
            if(words[i]) {
                words[i] = words[i][0].toUpperCase() + words[i].slice(1);
            }
        }
        data.text = words.join(' ');
        textArea.value = applyFormatting(data);
        copyToClipboard();
    });

    // InverseCase button
    document.getElementById("inverseCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");
        
        var data = removeFormatting(textArea.value);
        data.text = data.text.split('').map(function(c) {
            return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
        }).join('');
        textArea.value = applyFormatting(data);
        copyToClipboard();
    });

    // AlternatingCase button
    document.getElementById("alternatingCase").addEventListener("click", function() {
        var textArea = document.getElementById("textArea");

        var data = removeFormatting(textArea.value);
        var alternatingText = '';
        for (var i = 0; i < data.text.length; i++) {
            var char = data.text[i];
            alternatingText += i % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }
        data.text = alternatingText;
        textArea.value = applyFormatting(data);
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
    textArea.addEventListener("input", nbCarFunction);

    function nbCarFunction() {
        var data = removeFormatting(textArea.value);
        nbCar.textContent = data.text.length;
    }

    // nbMots
    textArea.addEventListener("input", nbMotsFunction);

    function nbMotsFunction() {
        var data = removeFormatting(textArea.value);
        var words = data.text.split(/[\s,.]+/).filter(function(word) {
            return word.length > 0;
        });
        nbMots.textContent = words.length;
    }

    // nbLigne
    textArea.addEventListener("input", nbLigneFunction);

    function nbLigneFunction() {
        var data = removeFormatting(textArea.value);
        if (data.text.trim() === '') {
            nbLigne.textContent = 0;
        } else {
            var lines = data.text.split(/\r\n|\r|\n/);
            nbLigne.textContent = lines.length;
        }
    }

    // nbSentence
    textArea.addEventListener("input", nbSentenceFunction);

    function nbSentenceFunction() {
        var data = removeFormatting(textArea.value);
        var sentences = data.text.split('.').filter(function(sentence) {
            return sentence.trim().length > 0;
        });
        nbSentence.textContent = sentences.length;
    }

    // -----------------textArea Menu
    document.getElementById("textFormat").addEventListener("change", function() {
        var textArea = document.getElementById("textArea");
        var selectedOption = this.value;
    
        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;
    
        // If no text is selected, apply formatting to the whole text
        if(start === end) {
            start = 0;
            end = textArea.value.length;
        }
    
        var before = textArea.value.substring(0, start);
        var selectedText = textArea.value.substring(start, end);
        var after = textArea.value.substring(end);
    
        // Remove any existing formatting from the start and end of the selected text
        selectedText = selectedText.replace(/^(<\/?h[1-3]>|<\/?p>)/, '').replace(/(<\/?h[1-3]>|<\/?p>)$/, '');
    
        if(selectedOption === "normal") {
            // Do nothing, just remove existing formatting
        } else if(selectedOption === "paragraph") {
            // Wrap the selected text in <p> tags
            selectedText = '<p>' + selectedText + '</p>';
        } else {
            // Wrap the selected text in the appropriate heading tag
            var headingNumber = selectedOption === "smallTitle" ? 3 : selectedOption === "mediumTitle" ? 2 : 1;
            selectedText = '<h' + headingNumber + '>' + selectedText + '</h' + headingNumber + '>';
        }
    
        textArea.value = before + selectedText + after;
    });

    // Get all the special character buttons
    var buttons = document.getElementsByClassName("special-character-button");

    // Add a click event listener to each button
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            // Get the special character from the button
            var specialCharacter = this.textContent;

            // Add the special character to the end of the text in the textarea
            var textArea = document.getElementById("textArea");
            textArea.value += specialCharacter;

            // Copy the special character to the clipboard
            navigator.clipboard.writeText(specialCharacter).then(function() {
                console.log("Copying to clipboard was successful!");
                // Mettre à jour le contenu de la div avec le message
                var messageDiv = document.getElementById("message");
                messageDiv.textContent = "Le caractère a été copié dans le presse-papiers !";
          
                // Ajouter une classe pour l'animation (optionnel)
                messageDiv.classList.add("show");
          
                // Supprimer la classe pour l'animation après un certain temps (optionnel)
                setTimeout(function() {
                  messageDiv.classList.remove("show");
                }, 3000); // 3 secondes par exemple
              }, function(err) {
                console.error("Could not copy text: ", err);
              });
            nbCarFunction();
            nbMotsFunction();
            nbLigneFunction();
            nbSentenceFunction();
        });
    }
}