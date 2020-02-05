# Запуск проекта 
1. yarn start


## Proxy config

**Пример с несколькими адресами в формате json**  
```json
{
    "/user/*": {
      "target": "http://localhost:3700",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": false,
      "pathRewrite": {
        "^/api/settings": "/api/app/settings",
        "^/api": ""
      }
    },
    "/product/*": {
      "target": "http://localhost:3800",
      "secure": false,
      "logLevel": "debug"
    },
    "/settings/*": {
      "target": "http://localhost:3900",
      "secure": false,
      "logLevel": "debug"
    }
}
```

**Пример множеством конектов и с типом файла js**  
```js
/*  */
const PROXY_CONFIG = [
  {
    context: [ "/api" ],
    target: "http://localhost:3000",
    secure: false,
    logLevel: "debug",
    changeOrigin: false
  }
];
    
module.exports = PROXY_CONFIG; 

```
