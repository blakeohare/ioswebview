(() => {

    let ui = {};
    
    let sendStringToSwift = (type, msg) => {
        let payload = b64Encode(type) + ":" + b64Encode(msg)
        window.webkit.messageHandlers.interop.postMessage(payload);
    };

    let handleMessage = (type, value) => {
        switch (type) {
            case 'CALCULATION':
                ui.resultPane.innerText = value === "PRIME" ? "Is prime!" : "Is not prime.";
                break;
            case 'ERROR':
                ui.resultPane.innerText = "An error occurred: " + value;
                break;
        }
    };

    window.sendStringToJavaScript = msg => {
        let parts = msg.split(':', 2);
        let msgType = b64Decode(parts[0]);
        let msgValue = b64Decode(parts[1] || "");
        handleMessage(msgType, msgValue);
    };
    
    window.addEventListener('load', () => {
        ui.textInput = document.getElementById('num');
        ui.calcButton = document.getElementById('calcBtn');
        ui.resultPane = document.getElementById('result');
        
        ui.calcButton.addEventListener('click', () => {
            let num = ui.textInput.value;
            sendStringToSwift("IS-PRIME", num);
        });
        
        sendStringToSwift("READY", "");
    });
    
 })();
