import UIKit
import WebKit

class ViewController: UIViewController, WKUIDelegate {

    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let myURL = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "jsres")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
    }

    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        view = webView
    }
}
