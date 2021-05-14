/*! Siger's Template Class - 2021-02-21
 *
 * @version: 1.0.2
 * 
 * https://siger.win
 * 
 */

if (typeof window.URL !== 'function') {
    window.URL = function(url){
        var param = {},search = "", url = (url || "").toString();
        if (!url || url.split("//").length !== 2)
            return console.error("Falha ao construir 'URL': 1 argumento necessário, mas apenas 0 presentes.");
        url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,k,v){param[k]=v.split("#")[0];search+=m})
        var _url = url.split("//");
        var _u = _url[1],
            _hash = _u.split("#"),
            hash = _hash[1] ? "#" + _hash[1] : "",
            host = _url[1].split("/")[0],
            hostname = host.split(":")[0]
            port = host.split(":")[1] ? host.split(":")[1] : "",
            pathname = _url[1].replace(host, "").replace(search, "").replace(hash, ""),
        this.hash = hash;
        this.host = host;
        this.hostname = hostname;
        this.href = url;
        this.origin = _url[0] + "//" + host;
        this.pathname = pathname;
        this.port = port;
        this.protocol = _url[0];
        this.search = search.split("#")[0];
        this.searchParams = {
            get: function(key){return param[key] || null},
            getAll: function(){return param || null}
        };
    }
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        enumerable: false,
        value: function(obj) {
            var newArr = this.filter(function(el) {
              return el == obj;
            });
            return newArr.length > 0;
        }
    });
}

var scripts = document.getElementsByTagName("script"),
url = new URL("https://"+scripts[0].getAttribute("src")),
app = 'browser';

/*var includesx = function() {
    return Array.prototype.indexOf.apply(this, arguments) !== -1;
},*/

assign = function(){
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            if (target === undefined || target === null)
                throw new TypeError('Cannot convert first argument to object');
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null)
                    continue;
                nextSource = Object(nextSource);
                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
},

padStart = function(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
        return String(this);
    } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length)
            padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        return padString.slice(0, targetLength) + String(this);
    }
},

zeroPad = function() {
    var length = arguments[0] || 4, add = arguments[1] || "0";
    return this.toString().padStart(length||4, add||"0");
},

/*
 * String.capitalize(): Primeira letra maiúscula
 *
 *  Exemplo:
 *    'misteregis'.capitalize();
 *    'SIGER'.capitalize();
 *
 * Resultado:
 *    'Misteregis'
 *    'Siger'
 *
 */
capitalize = function(str) {
    str = (str || this).toLowerCase().trim();
    return str.charAt(0).toUpperCase() + str.slice(1);
},

/*
 * String.format(): Formatar texto
 *
 *  Exemplo:
 *    'Meu nome é {0}, eu moro em {1}, trabalho na {2}.'.format('Reginaldo', 'Niterói', 'SMF');
 *
 * Resultado:
 *    'Meu nome é Reginaldo, eu moro em Niterói, trabalho na SMF.'
 *
 */
format = function() {
    var args = [];
    for(k in arguments) args.push(arguments[k]);
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
        ;
    });
},

fadeIn = function(){
    if (this.length) {
        for (var i = 0; i < this.length; i++)
            this[i].fadeIn(arguments);
        return this;
    }

    if (typeof arguments[0] === 'object') {
        args = [];
        for(k in arguments[0])
            args[k] = arguments[0][k];
        arguments = args;
    }

    var secs = !isNaN(arguments[0]) ? arguments[0] : .4,
        func = typeof arguments[0] === 'function' ? arguments[0] : (
            typeof arguments[1] === 'function' ? arguments[1] : null
        );

    if (secs === 0) {
        $style = this.style;
        $style.opacity = 1;
        $style.display = 'inline-block';
        $style.visibility = 'visible';
        return this;
    }

    this.style.opacity = 0;
    this.style.filter = "alpha(opacity=0)";
    this.style.display = "inline-block";
    this.style.visibility = "visible";

    var $this = this,
        opacity = 0,
        timer = setInterval(function() {
        opacity += 50 / (secs*1000);
        if( opacity >= 1 ) {
            clearInterval(timer);
            opacity = 1;

            if (func) func($this);
        }
        $this.style.opacity = opacity;
        $this.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
    return $this;
},

fadeOut = function(){
    if (this.length) {
        for (var i = 0; i < this.length; i++)
            this[i].fadeOut(arguments);
        return this;
    }

    if (typeof arguments[0] === 'object') {
        args = [];
        for(k in arguments[0])
            args[k] = arguments[0][k];
        arguments = args;
    }

    var secs = !isNaN(arguments[0]) ? arguments[0] : .4,
        func = typeof arguments[0] === 'function' ? arguments[0] : (
            typeof arguments[1] === 'function' ? arguments[1] : null
        );

    if (secs === 0) {
        $style = this.style;
        $style.opacity = 0;
        $style.display = 'none';
        $style.visibility = 'hidden';
        return this;
    }

    var $this = this,
        opacity = 1,
        timer = setInterval( function() {
        opacity -= 50 / (secs*1000);
        if( opacity <= 0 ) {
            clearInterval(timer);
            opacity = 0;
            $this.style.display = "none";
            $this.style.visibility = "hidden";

            if (func) func($this);
        }
        $this.style.opacity = opacity;
        $this.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
    return $this;
},

html = function() {
    if (this.length) {for (var i = 0; i < this.length; i++) this[i].html(arguments);return this}
    if (typeof arguments[0] === 'object') arguments[0] = arguments[0][0];
    if (!arguments[0]) return this.outerHTML;
    return this.innerHTML = typeof arguments[0] === 'object' ? arguments[0].outerHTML : arguments[0];
},

text = function() {
    if (this.length) {for (var i = 0; i < this.length; i++) this[i].text(arguments);return this}
    if (typeof arguments[0] === 'object') arguments[0] = arguments[0][0];
    if (!arguments[0]) return this.innerText;
    return this.innerText = typeof arguments[0] === 'object' ? arguments[0].innerText : arguments[0];
},

show = function() {return this.fadeIn(0)},
hide = function() {return this.fadeOut(0)},

append = function() {
    if (this.length) return this._each(arguments);
    var $div = document.createElement('div');
    $div.innerHTML = arguments[0].trim();
    return this.appendChild($div.firstChild);
},

setScaledFont = function() {
    if (this.length) return this._each(arguments);
    var f = arguments[0],
        s = this.offsetWidth,
        fs = s * (f?f:.35);
    return this.style.fontSize = fs + '%';
},

_each = function(){
    for (var i = 0; i < this.length; i++)
        this[i][arguments[0].callee.name](arguments[0][0]);
    return this
},

 /* [case insensitive]
  * __call(FNAME, FTYPE): Cria uma função prototype com nome e tipo da função
  * - FNAME: Nome da função
  * - FTYPE: Tipo da função (pode ser vários separados por vírgula)
  * 
  * 
  *  Exemplo:
  *    __call('setScaledFont', 'NodeList,Element');
  *    - O exemplo acima irá criar dois prototype para a função 'setScaledFont'
  *    - Um do tipo 'NodeList' e outro do tipo 'Element':
  *    -- NodeList.prototype.setScaledFont = setScaledFont;
  *    -- Element.prototype.setScaledFont = setScaledFont;
  *
  * --------------------------------------------------------------------------
  * __call(Object): Cria uma ou mais funções prototype a partir de um objeto
  *  Exemplo:
  *    __call({
  *      setScaledFont: 'NodeList,Element',
  *      capitalize: 'String'
  *    });
  *    - O exemplo acima irá criar dois prototype para a função 'setScaledFont' eum prototype para a função 'capitalize'
  *    - [setScaledFont] um prototype do tipo 'NodeList' e outro do tipo 'Element':
  *    -- NodeList.prototype.setScaledFont = setScaledFont;
  *    -- Element.prototype.setScaledFont = setScaledFont;
  * 
  *    - [capitalize] um prototype do tipo 'String':
  *    -- String.prototype.capitalize = capitalize;
  *
  */
__call = function() {
    if (typeof arguments[0] === 'object') {
        for(k in arguments[0])
            __call(k, arguments[0][k]);
        return;
    }
    var f = arguments[0], ftype = arguments[1],
        _capitalize = {Nodelist: 'NodeList'};
    ftype.split(',').forEach(function(t, i){
        t = capitalize(t);
        t = _capitalize[t] || t;
        if (t === 'Object') {
            if (!$.fn[f]) $.fn[f] = eval(f);
        } else {
            eval(t).prototype[f] = eval(f);
        }
    });
};


if (!window.jQuery) {
    window.$ = function(selector) {
        if (typeof selector === 'object') return selector;
        return document.querySelectorAll(selector)
    }
    $.fn = {}
    $.isFunction = function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    window.jQuery = $;
}

if (!Object.assign) assign();

var SIGER = SIGER || {};

SIGER = Object.assign({

    /*
     * SIGER.set(key, value): Salva dados no localStorage na chave Siger[APP]
     * você também pode salvar dados com subchaves separando-os com ponto (.)
     *
     *  Exemplo:
     *    var app = 'meu_app';
     *    SIGER.set('teste', 'Meu teste');
     *    SIGER.set('config', {theme:'dark'});
     *    SIGER.set('config.site.title', 'Meu Site');
     *
     * Resultado:
     *    localStorage.Siger = { "meu_app": { "teste": "Meu teste" } }
     *    localStorage.Siger = { "meu_app": { "config": { "theme": "dark" } } }
     *    localStorage.Siger = { "meu_app": { "config": { "site": {"title":"Meu Site"} } } }
     *
     */
    set: function(key, value){
        if (typeof app === 'string') {
            if (key && value) {
                var sets = this.get(),
                    _siger = JSON.parse(localStorage.Siger),
                    keys = key.split('.'),
                    $eval = 'sets'
                for(k in keys) {
                    $eval += '["' + keys[k] + '"]'
                    console.log($eval)
                    if (typeof eval($eval) === 'undefined')
                        eval($eval + ' = {}')
                }
                if (typeof value === 'object')
                    $eval += ' = ' + JSON.stringify(value)
                else
                    $eval += ' = "' + value + '"'
                eval($eval)
                _siger[app] = sets
                localStorage.Siger = JSON.stringify(_siger)
                return sets
            }
        } else {
            console.info('A variável "app" não está definida')
        }
    },

    /*
     * SIGER.get(key): Obtém um ou todos os dados em localStorage na chave Siger[APP]
     * você também pode obter dados em subchaves separando-as com ponto (.)
     *
     *  Exemplo:
     *    var app = 'meu_app';
     *    var all = SIGER.get(); // (object) {"meu_app":{"teste":"Meu teste","config":{"theme":"dark"}}}
     *    var teste = SIGER.get('teste'); // (string) "Meu teste"
     *    var config = SIGER.get('config'); // (object) {"theme":"dark"}
     *    var theme = SIGER.get('config.theme') // (string) "dark"
     *
     * Resultado:
     *    theme = 'dark';
     *
     */
    get: function(key, _default){
        if (typeof app === 'string') {
            if (!localStorage.Siger)
                localStorage.Siger = JSON.stringify({})
            var sets = JSON.parse(localStorage.Siger);
            if (!sets[app]) {
                sets[app] = _default || {}
                localStorage.Siger = JSON.stringify(sets)
            }
            if (key) {
                var found = true,
                    $eval = 'sets[app]',
                    keys = key.split('.')
                for(k in keys) {
                    $eval += '["' + keys[k] + '"]'
                    if (typeof eval($eval) === 'undefined') {
                        console.info('A chave ' + $eval.replace('sets[app]', '') + ' não foi encontrada.')
                        found = false
                        break;
                    }
                }
                return found ? eval($eval) : null
            }
            return sets[app]
        } else {
            console.info('A variável "app" não está definida')
        }
    },

    /*
     * SIGER.del(key): Deleta um ou todos os dados em localStorage na chave Siger[APP]
     * você também pode excluir dados em subchaves separando-as com ponto (.)
     *
     *  Exemplo:
     *    var app = 'meu_app';
     *    var all = SIGER.get(); // (object) {"meu_app":{"teste":"Meu teste","config":{"theme":"dark"}}}
     *    var teste = SIGER.get('teste'); // (string) "Meu teste"
     *    var config = SIGER.get('config'); // (object) {"theme":"dark"}
     *    var theme = SIGER.get('config.theme') // (string) "dark"
     *
     */
    del: function(key){
        if (typeof app === 'string') {
            if (key) {
                var _siger = JSON.parse(localStorage.Siger),
                    keys = key.split('.'),
                    sets = this.get(),
                    $eval = 'sets'
                for(k in keys) {
                    $eval += '["' + keys[k] + '"]'
                    if (typeof eval($eval) === 'undefined') {
                        console.info('A chave ' + $eval.replace('sets[app]', '') + ' não foi encontrada.')
                        break;
                    }
                }
                eval('delete ' + $eval)
                _siger[app] = sets
                localStorage.Siger = JSON.stringify(_siger)
            } else {
                console.info('Nenhuma chave definida')
            }
        } else {
            console.info('A variável "app" não está definida')
        }
    },

    /*
     * SIGER.focusTextToEnd(element): Foca o elemento e coloca o marcador no fim
     */
    focusTextToEnd: function(element){
        var v = element.value;
        element.focus();
        element.value = '';
        element.value = v;
    },

    /*
     * SIGER.editInLine(element, callback): Edita um elemento em linha e executa o callback (caso exista)
     * O callback irá retornar três parâmetros callback(elemento, valor_antigo, novo_valor)
     */
    editInLine: function(element, callback){
        if (!element.querySelector('input')){
            var t = element.textContent,o = t,
                $input = document.createElement('input');
            $input.setAttribute('class', 'editInLine');
            $input.setAttribute('value', t);
            element.innerHTML = '';
            element.appendChild($input);
            setTimeout(function(){SIGER.focusTextToEnd($input)},100);
            $input.addEventListener('keyup', function(event){
                var keycode = event.keyCode || event.which;

                var v = this.value.trim();
                if (keycode === 13) {
                    if (callback && t !== v){
                        t = v;element.textContent = v;
                        callback(element, o, v);
                    } else {
                        element.textContent = v;
                    }
                }
            });
            $input.addEventListener('blur', function(event){
                this.disabled = true;
                var v = this.value.trim();
                element.textContent = v;
                if (callback && t !== v)
                    callback(element, o, v);
            });
        }
    },

    /*
     * SIGER.array_flip(): Troca a chave por valor de um Object ou Array
     *
     *  Exemplo:
     *    var obj = {author:'misteregis',mark:'Siger'};
     *    var obj_flip = SIGER.array_flip(obj);
     *
     * Resultado:
     *    obj_flip = {"misteregis x": "author", siger: "mark"}
     *
     */
    array_flip: function($array){
        return flipped = Object.keys($array)
            .filter($array.hasOwnProperty.bind($array))
            .reduce(function(obj, key) {
                obj[$array[key].toLowerCase()] = key;
                return obj;
            }, {});
    },

    /*
     * SIGER.in_array(): Verifica se uma chave existe num array
     *
     *  Exemplo:
     *    var arr = ['account disabled','welcome','dialog-login','dialog-view','close'];
     *    var exists1 = SIGER.in_array('welcome', arr);
     *    var exists2 = SIGER.in_array('welCOME', arr);
     *
     * Resultado:
     *    exists1 = true
     *    exists2 = false
     *
     */
    in_array: function($needle, $haystack){return $haystack.indexOf($needle) > -1},

    /*
     * SIGER.remove(): Remove um elemento de um Object ou Array pela chave
     *
     *  Exemplo:
     *    var obj = {author:'misteregis',mark:'Siger'};
     *    var arr = ['misteregis', 'Siger'];
     *    obj = SIGER.remove(obj, 'mark');
     *    arr = SIGER.remove(arr, 'Siger');
     *
     * Resultado:
     *    obj = {author:"misteregis"}
     *    arr = ["misteregis"]
     *
     */
    remove: function(obj, key){
        if (Array.isArray(obj))
            obj.splice(key, 1);
        else if (obj != null && typeof obj == 'object')
            delete obj[key];
        return obj;
    },

    /*
     * SIGER.toDay(): Obtém a date de hoje por extenso
     *
     *  Exemplo:
     *    SIGER.toDay()
     *
     * Resultado:
     *    Niterói, 21 de fevereiro de 2021
     *
     */
    toDay: function(){
        var today = new Date(),
            dd = today.getDate(),
            month = today.toLocaleString('pt-BR', { month: 'long' }),
            yyyy = today.getFullYear();

        return 'Niterói, {0} de {1} de {2}'.format(dd, month, yyyy);
    },

    /*
     * SIGER.dateObj(): Objeto contendo o dia, mês, ano, hora, minuto e segundos atual
     *
     *  Exemplo:
     *    var d_obj = SIGER.dateObj();
     *    var ano = d_obj.year;
     *    var dia = d_obj['month'];
     *    var minuto = SIGER.dateObj('minute');
     *
     * Resultado:
     *    d_obj = {year: 2020, month: {number: "01", name: "janeiro"}, day: 12, hour: 12, minute: 24,second: 26}
     *    ano = 2020
     *    dia = 12
     *    minuto = 24
     *
     */
    dateObj: function(key, key2, rKey){
        var d = new Date();

        if (key && !isNaN(key)) {
            if (key.toString().length === 10 || key.toString().length === 13) {
                if (key.toString().length === 10)
                    key = new Date(key * 1000);
                else
                    key = new Date(key);
            }
        }

        if (key instanceof Date) {
            d = key;
            if (key2) {
                key = key2;
                key2 = null;
            }
        }

        if (key === 'timestamp')
            return Math.floor(d.getTime()/1000);

        if (key === 'today')
            d.setHours(0,0,0,0);

        if (key === 'yesterday')
            d.setDate(d.getDate() - 1);

        if (key === 'sevenday')
            d.setDate(d.getDate() - 7);

        var year = d.getFullYear(),
            month = d.getMonth()+1,
            day = d.getDate(),
            hour = d.getHours().zeroPad(2),
            minute = d.getMinutes().zeroPad(2),
            second = d.getSeconds().zeroPad(2),
            weekday = d.getDay();

        

        var longmonth = d.toLocaleString('pt-BR', { month: 'long' });
        var longweekday = d.toLocaleString('pt-BR', { weekday: 'long' });

        if (month<10)
            month='0'+month;

        var obj = {timestamp: Math.floor(d.getTime()/1000), year: year, day: day, hour: hour, minute: minute, second: second};
        obj.fulldate = year+month+day+hour+minute+second;
        obj.weekday = {number: weekday, name: longweekday};
        obj.month = {number: month, name: longmonth};
        obj.date = d;

        if (typeof key == 'string' && key2)
            return this.dateObj(d, key2, key);

        if (obj.hasOwnProperty(rKey))
            return obj[rKey];

        if (obj.hasOwnProperty(key))
            return obj[key];

        if (key === 'obj' || rKey === 'obj')
            return obj;

        return d;
    },

    /*
     * SIGER.formatDate(): Formata data e hora apartir do timestamp
     */
    formatDate: function($timestamp, $extend, $toLower, $short){
        var defaults = {timestamp:null,extend:false,toLower:false,short:false};
        var s = {};

        if (typeof $timestamp === 'object')
            s = Object.assign(defaults, $timestamp);
        else
            s = Object.assign(defaults, {
                timestamp: $timestamp,
                toLower: $toLower,
                extend: $extend,
                short: $short
            });

        if (!s.timestamp) return;

        var $dd = SIGER.dateObj(s.timestamp, 'obj');
            $t = $dd.hour+':'+$dd.minute,
            $w = $dd.weekday.name.split('-')[0],
            $m = $dd.month.name,
            $y = $dd.year,
            $d = $dd.day,
            $r = '';

        var $month = ($y === SIGER.dateObj() && $m === SIGER.dateObj().month.name) ? '' : ' de ' + $m,
            $year = $y === SIGER.dateObj().year ? '' : ' de ' + $y,
            sdate = new Date(),
            ydate = new Date();

        var $sevendayTimestamp = SIGER.dateObj('sevenday', 'timestamp'),
            $yesterdayTimestamp = SIGER.dateObj('yesterday', 'timestamp'),
            $today = SIGER.dateObj('obj', 'today'), $now = SIGER.dateObj('obj'),
            $todayTimestamp = $today.timestamp;

        if (s.timestamp > $sevendayTimestamp) {
            $r = $w + ', dia ' + $d + $month + $year + ' às ' + $t;
        } else {
            $r = 'Dia ' + $d + $month + $year + ' às ' + $t;
        }

        var seconds = Math.round(($now.date - $dd.date) / 1000),
            minutes = Math.round(seconds / 60);

        if (seconds < 5)
            return 'agora'
        else if (seconds < 60)
            return '{0} segundos atrás'.format(seconds)
        else if (seconds < 90)
            return 'cerca de um minuto atrás'
        else if (minutes < 60)
            return '{0} minutos atrás'.format(minutes)
        else if (minutes < 61)
            return 'Uma hora atrás'.format(minutes)

        if (!s.extend && s.timestamp >= $todayTimestamp)
            $r = 'Hoje às ' + $t;
        else if (!s.extend && s.timestamp >= $yesterdayTimestamp)
            $r = 'Ontem às ' + $t;

        if (s.short) {
            $r = $d.zeroPad(2) + '/' + $dd.month.number + '/' + $y + ' ' + $t;
            
            if (s.timestamp >= $todayTimestamp)
                $r = 'Hoje às ' + $t;
            else if (s.timestamp >= $yesterdayTimestamp)
                $r = 'Ontem às ' + $t;
        }

        return s.toLower ? $r.toLowerCase() : $r.capitalize();
    },

    /*
     * SIGER.loadJSON(): Carrega objeto JSON via URL
     *
     *  Exemplo:
     *    file.json = {author:'misteregis',mark:'Siger'};
     *    SIGER.loadJSON('file.json', function(json){console.log(json)});
     *
     * Resultado:
     *    console: {author:'misteregis',mark:'Siger'}
     *
     */
    loadJSON: function(path, success, error){
        var r = Math.floor(Math.random() * 99999) + 1;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr.statusText);
                }
            }
        };

        xhr.open("GET", path + '?r=' + r, true);
        xhr.send();
    },

    /*
     * SIGER.is_numeric(): Verifica se um valor é numéricou ou não, retornando true/false
     *
     *  Exemplo:
     *    SIGER.is_numeric(123456)
     *    SIGER.is_numeric("123456")
     *    SIGER.is_numeric("A123456")
     *
     * Resultado:
     *    123456: true
     *    "123456": true
     *    "A123456": false
     *
     */
    is_numeric: function(n) {return !isNaN(parseFloat(n)) && isFinite(n)},

    /*
     * SIGER.JSON.clone(): Clonar objeto (JSON)
     *
     *  Exemplo:
     *    var obj = {author:'misteregis',mark:'Siger'}; [contém as chaves (author e mark) e os valores (misteregis e Siger)]
     *    var novo_obj = {}; [objeto vazio];
     *
     *    novo_obj = SIGER.JSON.clone(obj);
     *
     * Resultado:
     *    novo_obj = {author:'misteregis',mark:'Siger'}; [contém as chaves (author e mark) e os valores (misteregis e Siger)]
     *
     */
    JSON: {
        clone: function(obj){
            return JSON.parse(JSON.stringify(obj));
        }
    },

    /*
     * SIGER.merge(): Junta dois ou mais array ou json object em um
     *
     *  Exemplo:
     *    var objA = {author:'misteregis',mark:'Siger'};
     *    var objB = {year:'2020',by:'Siger'};
     *    var objC = {windows:10,x:'x64'};
     *
     *    objAB = SIGER.merge(objA, objB);
     *    objABC = SIGER.merge(objA, objB, objC);
     *
     * Resultado:
     *    objAB = {author: "misteregis", mark: "Siger", year: "2020", by: "Siger"};
     *    objABC = {author: "misteregis", mark: "Siger", year: "2020", by: "Siger", windows: 10, x: "x64"};
     *
     */
    /*mixin: function(obj, merge) {
        for (var key in merge) {
            obj[key] = merge[key];
        }
        return obj;
    }*/
    merge: function() {
        var obj = arguments[0] || null;
        if (arguments.length > 1)
            for(var i = 1; i < arguments.length; i++)
                for (var key in arguments[i])
                    obj[key] = arguments[i][key];
        return obj;
    },

    /*
     * SIGER.toBool(): Converte string boolean string ('true', 'false') para boolean
     *
     *  Exemplo:
     *    var _f = SIGER.toBool('false');
     *    var _t = SIGER.toBool('true');
     *
     * Resultado:
     *    _f = false;
     *    _t = true;
     *
     */
    toBool: function($bool) {return JSON.parse($bool.toString().toLowerCase())},

    setTheme: function($theme) {
        var _theme =  SIGER.get('theme');
        if ($theme === 'toggle') {
            var t = {dark: 'light', light: 'dark'}
            $theme = t[_theme];
        }
        if ($theme) {
            SIGER.set('theme', $theme)
            SIGER.cookie('theme', $theme)
        }
        if (!$theme && !_theme) {
            $theme = document.body.getAttribute('data-theme')
            //SIGER.set('theme', document.body.getAttribute('data-theme'))
            SIGER.cookie('theme', $theme)
            SIGER.set('theme', $theme)
        } else {
            document.body.setAttribute('data-theme', ($theme || SIGER.get('theme')))
        }
    },

    /*
     * SIGER.cookie(): Cria, obtém ou exclui um cookie
     *
     *  Exemplos:
     *    SIGER.cookie('tema', 'light', '3'); // Irá criar um cookie com nome "tema", valor "light" e duração "3 dias"
     *    SIGER.cookie('tema'); // Irá obter o valor do cookie "tema", você também pode obter valor usando SIGER.cookie('get', 'tema');
     *    SIGER.cookie('delete', 'tema'); // Irá excluir o cookie "tema", você também pode excluir usando SIGER.cookie(null, 'tema');
     *
     */
    cookie: function(name, value, days){
        days = days ? days : 360

        var path = new URL(window.location).pathname,
            cookie = {
            get: function(n){
                if (n) name = n
                var nameEQ = name + "="
                var ca = document.cookie.split(';')
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i]
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
                }
                return null
            },
            set: function(n,d){
                if (n) name = n

                if (days) {
                    var date = new Date()
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
                    var expires = "; expires=" + date.toGMTString()
                } else {
                    var expires = ''
                }

                if (d)
                    document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"
                else
                    document.cookie = name + "=" + value + expires + "; path=" + path
            },
            delete: function(name){
                cookie.set(name,1)
            }
        }

        if (name === null)
            return cookie.delete(value)

        if ($.isFunction(cookie[name]))
            return cookie[name](value)

        if (value)
            cookie.set()

        return cookie.get(name)
    }
}, SIGER);

window.onload = function() {
    SIGER.setTheme();

    __call({
        //includesx:       'Array',
        assign:         'Object',
        padStart:       'String',
        zeroPad:        'String,Number',
        capitalize:     'String',
        format:         'String',
        fadeIn:         'NodeList,Element',
        fadeOut:        'NodeList,Element',
        html:           'NodeList,Element',
        text:           'NodeList,Element',
        show:           'NodeList,Element',
        hide:           'NodeList,Element',
        //append:         'NodeList,Object,Element',
        setScaledFont:  'NodeList,Object,Element',
        _each:          'NodeList,Object,Element'
    });
}
//# sourceURL=siger/main.js
