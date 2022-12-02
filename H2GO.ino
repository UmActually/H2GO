/**
 * @file H2GO.ino
 * Karen Gutiérrez Solís         A00835268
 * Adrian Eduardo Treviño Peña   A01198211
 * Leonardo Corona Garza         A00832792
 * Diego Esparza Hurtado         A01652327
 * Ximena Moctezuma Armendariz   A01722050
 */

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>

DHT dht(D3, DHT11);

// WIFI credentials
const char *ssid = "Tec-IoT";
const char *password = "spotless.magnetic.bridge";

ESP8266WebServer server(80);

/**
 * @brief Inicializa el sensor, el monitor serial,
 * el módulo de WiFi, y el servidor web.
 */
void setup() {
  pinMode(D4, OUTPUT);
  digitalWrite(D4, LOW);
  Serial.begin(115200);
  dht.begin();

  WiFi.mode(WIFI_OFF);
  delay(1000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("");
  Serial.println("Conectado");

  Serial.println(WiFi.localIP());
  server.on("/", handleRequest);
  server.begin();
}

/**
 * @brief Revisar constantemente web requests.
 */
void loop() {
  server.handleClient();
}

/**
 * @brief Lee la temperatura del sensor DHT11 y
 * regresarla como string.
 */
String getTemperature() {
  float tempFloat = dht.readTemperature();

  if (isnan(tempFloat)) {
    Serial.println(F("No se pudo leer temperatura"));
    return String();
  }

  return String(tempFloat);
}

/**
 * @brief Recibe una request HTTP con parámetros.
 * 
 * Se espera que la request se elabore como en el siguiente
 * ejemplo: http://10.22.245.88/?temperature=true&boiler=true
 * Cuando el parámetro 'temperature' es true, se responde
 * la request con la temperatura en grados celsius. Cuando
 * el parámetro 'boiler' es true, se cambiará el estado
 * actual del boiler (representado por la luz LED).
 */
void handleRequest() {
  Serial.println("Se recibió request");

  String json = "{";

  bool getTemp = server.arg(0) == "true";
  bool toggleBoiler = server.arg(1) == "true";

  if (getTemp) {
    json += "\"temperature\": " + getTemperature();
    if (toggleBoiler) {
      json += ", ";
    }
  }

  if (toggleBoiler) {
    if (digitalRead(D4) == HIGH) {
      digitalWrite(D4, LOW);
      json += "\"boiler\": false";
    } else {
      digitalWrite(D4, HIGH);
      json += "\"boiler\": true";
    }
  }

  json += "}";

  Serial.println(json);
  server.send(200, "application/json", json.c_str());
}
