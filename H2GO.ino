// Database URL: mysql://bd670e0228877e:f343723d@us-cdbr-east-06.cleardb.net/heroku_fd12f7f7304c66a?reconnect=true
// User: bd670e0228877e
// Password: f343723d
// Host: us-cdbr-east-06.cleardb.net

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <Fetch.h>
#include <DHT.h>

DHT dht(D3, DHT11);

// WIFI credentials
const char *ssid = "Tec-IoT";
const char *password = "spotless.magnetic.bridge";

// definir endpoint
const char *host = "iot-h2go.herokuapp.com";
const char *uri = "/db-endpoint.php";
const char *apiKey = "sinpuntos.magnetico.puente";

unsigned long lastMillis = 0;
long interval = 60000;

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  WiFi.mode(WIFI_OFF);
  delay(1000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    if(millis() - lastMillis > interval) {
        //Send an HTTP POST request every interval seconds
        Serial.println("upload_temperature()");
        upload_temperature();
        lastMillis = millis();
  }
  } else {
    Serial.println("WiFi desconectado");
  }

  delay(1000);  
}


void upload_temperature() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (isnan(h) || isnan(t)) {
    Serial.println(F("No se pudo leer temperatura"));
    return;
  }

  String humidity = String(h, 2);
  String temperature = String(t, 2);

  Serial.println("Temperatura: " + temperature);
  Serial.println("Humedad: " + humidity);

  String method = "POST ";
  method += uri;
  method += " HTTP/1.1";

  String body = "api_key=";
  body += apiKey;
  body += "&temperature=" + temperature;
  body += "&humidity=" + humidity;

  WiFiClientSecure httpsClient;
  httpsClient.setFingerprint("2A EE AF BB 00 2B 58 11 72 9E 1E 98 C8 8C C7 82 52 5A 37 E6");
  httpsClient.setTimeout(15000);
  delay(1000);

  int tries = 0;
  while (!httpsClient.connect(host, 443)) {
    delay(100);
    Serial.print(".");
    if (++tries == 30) {
      Serial.println("");
      Serial.println("No se pudo conectar al servidor");
      return;
    }
  }

  Serial.println("");
  Serial.println("Conectado al servidor");

  httpsClient.println(method.c_str());
  httpsClient.print("Host: "); httpsClient.println(host);
  httpsClient.println("User-Agent: BuildFailureDetectorESP8266");
  httpsClient.println("Content-Type: application/x-www-form-urlencoded");
  httpsClient.print("Content-Length: "); httpsClient.println(body.length());
  httpsClient.println();
  httpsClient.println(body.c_str());
  httpsClient.println("Connection: keep-alive");

  Serial.println("Se envió request");
  while (httpsClient.connected()) {
    String line = httpsClient.readStringUntil('\n');
    if (line == "\r") {
      Serial.println("Se recibieron headers");
      break;
    }
  }
  
  while(httpsClient.available()){        
    String line = httpsClient.readStringUntil('\n');  //Read Line by Line
    Serial.println(line); //Print response
  }
}
