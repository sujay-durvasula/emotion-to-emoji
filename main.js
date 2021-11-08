//https://teachablemachine.withgoogle.com/models/QiD36Usde/
prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 340,
    height: 340,
    image_format: 'jpeg',
    jpeg_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';
    });
}

console.log('ml 5.version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QiD36Usde/model.json', modelloded);

function modelloded() {
    console.log("model is loaded succesfuly");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if (results[0].label == "sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (results[0].label == "angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if (results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}