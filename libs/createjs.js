self.createjs = self.createjs || {},
createjs.extend = function(t, e) {
    "use strict";
    function i() {
        this.constructor = t
    }
    return i.prototype = e.prototype,
    t.prototype = new i
}
,
self.createjs = self.createjs || {},
createjs.promote = function(t, e) {
    "use strict";
    var i = t.prototype
        , s = Object.getPrototypeOf && Object.getPrototypeOf(i) || i.__proto__;
    if (s) {
        i[(e += "_") + "constructor"] = s.constructor;
        for (var n in s)
            i.hasOwnProperty(n) && "function" == typeof s[n] && (i[e + n] = s[n])
    }
    return t
}
,
self.createjs = self.createjs || {},
createjs.indexOf = function(t, e) {
    "use strict";
    for (var i = 0, s = t.length; s > i; i++)
        if (e === t[i])
            return i;
    return -1
}
,
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i) {
        this.type = t,
        this.target = null,
        this.currentTarget = null,
        this.eventPhase = 0,
        this.bubbles = !!e,
        this.cancelable = !!i,
        this.timeStamp = (new Date).getTime(),
        this.defaultPrevented = !1,
        this.propagationStopped = !1,
        this.immediatePropagationStopped = !1,
        this.removed = !1
    }
    var e = t.prototype;
    e.preventDefault = function() {
        this.defaultPrevented = this.cancelable && !0
    }
    ,
    e.stopPropagation = function() {
        this.propagationStopped = !0
    }
    ,
    e.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }
    ,
    e.remove = function() {
        this.removed = !0
    }
    ,
    e.clone = function() {
        return new t(this.type,this.bubbles,this.cancelable)
    }
    ,
    e.set = function(t) {
        for (var e in t)
            this[e] = t[e];
        return this
    }
    ,
    e.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }
    ,
    createjs.Event = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        this._listeners = null,
        this._captureListeners = null
    }
    var e = t.prototype;
    t.initialize = function(t) {
        t.addEventListener = e.addEventListener,
        t.on = e.on,
        t.removeEventListener = t.off = e.removeEventListener,
        t.removeAllEventListeners = e.removeAllEventListeners,
        t.hasEventListener = e.hasEventListener,
        t.dispatchEvent = e.dispatchEvent,
        t._dispatchEvent = e._dispatchEvent,
        t.willTrigger = e.willTrigger
    }
    ,
    e.addEventListener = function(t, e, i) {
        var s;
        s = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var n = s[t];
        return n && this.removeEventListener(t, e, i),
        n = s[t],
        n ? n.push(e) : s[t] = [e],
        e
    }
    ,
    e.on = function(t, e, i, s, n, r) {
        return e.handleEvent && (i = i || e,
        e = e.handleEvent),
        i = i || this,
        this.addEventListener(t, function(t) {
            e.call(i, t, n),
            s && t.remove()
        }, r)
    }
    ,
    e.removeEventListener = function(t, e, i) {
        var s = i ? this._captureListeners : this._listeners;
        if (s) {
            var n = s[t];
            if (n)
                for (var r = 0, o = n.length; o > r; r++)
                    if (n[r] == e) {
                        1 == o ? delete s[t] : n.splice(r, 1);
                        break
                    }
        }
    }
    ,
    e.off = e.removeEventListener,
    e.removeAllEventListeners = function(t) {
        t ? (this._listeners && delete this._listeners[t],
        this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
    }
    ,
    e.dispatchEvent = function(t) {
        if ("string" == typeof t) {
            var e = this._listeners;
            if (!e || !e[t])
                return !1;
            t = new createjs.Event(t)
        } else
            t.target && t.clone && (t = t.clone());
        try {
            t.target = this
        } catch (i) {}
        if (t.bubbles && this.parent) {
            for (var s = this, n = [s]; s.parent; )
                n.push(s = s.parent);
            var r, o = n.length;
            for (r = o - 1; r >= 0 && !t.propagationStopped; r--)
                n[r]._dispatchEvent(t, 1 + (0 == r));
            for (r = 1; o > r && !t.propagationStopped; r++)
                n[r]._dispatchEvent(t, 3)
        } else
            this._dispatchEvent(t, 2);
        return t.defaultPrevented
    }
    ,
    e.hasEventListener = function(t) {
        var e = this._listeners
            , i = this._captureListeners;
        return !!(e && e[t] || i && i[t])
    }
    ,
    e.willTrigger = function(t) {
        for (var e = this; e; ) {
            if (e.hasEventListener(t))
                return !0;
            e = e.parent
        }
        return !1
    }
    ,
    e.toString = function() {
        return "[EventDispatcher]"
    }
    ,
    e._dispatchEvent = function(t, e) {
        var i, s = 1 == e ? this._captureListeners : this._listeners;
        if (t && s) {
            var n = s[t.type];
            if (!n || !(i = n.length))
                return;
            try {
                t.currentTarget = this
            } catch (r) {}
            try {
                t.eventPhase = e
            } catch (r) {}
            t.removed = !1,
            n = n.slice();
            for (var o = 0; i > o && !t.immediatePropagationStopped; o++) {
                var a = n[o];
                a.handleEvent ? a.handleEvent(t) : a(t),
                t.removed && (this.off(t.type, a, 1 == e),
                t.removed = !1)
            }
        }
    }
    ,
    createjs.EventDispatcher = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        throw "Ticker cannot be instantiated."
    }
    t.RAF_SYNCHED = "synched",
    t.RAF = "raf",
    t.TIMEOUT = "timeout",
    t.useRAF = !1,
    t.timingMode = null,
    t.maxDelta = 0,
    t.paused = !1,
    t.removeEventListener = null,
    t.removeAllEventListeners = null,
    t.dispatchEvent = null,
    t.hasEventListener = null,
    t._listeners = null,
    createjs.EventDispatcher.initialize(t),
    t._addEventListener = t.addEventListener,
    t.addEventListener = function() {
        return !t._inited && t.init(),
        t._addEventListener.apply(t, arguments)
    }
    ,
    t._inited = !1,
    t._startTime = 0,
    t._pausedTime = 0,
    t._ticks = 0,
    t._pausedTicks = 0,
    t._interval = 50,
    t._lastTime = 0,
    t._times = null,
    t._tickTimes = null,
    t._timerId = null,
    t._raf = !0,
    t.setInterval = function(e) {
        t._interval = e,
        t._inited && t._setupTick()
    }
    ,
    t.getInterval = function() {
        return t._interval
    }
    ,
    t.setFPS = function(e) {
        t.setInterval(1e3 / e)
    }
    ,
    t.getFPS = function() {
        return 1e3 / t._interval
    }
    ;
    try {
        Object.defineProperties(t, {
            interval: {
                get: t.getInterval,
                set: t.setInterval
            },
            framerate: {
                get: t.getFPS,
                set: t.setFPS
            }
        })
    } catch (e) {
        console.log(e)
    }
    t.init = function() {
        t._inited || (t._inited = !0,
        t._times = [],
        t._tickTimes = [],
        t._startTime = t._getTime(),
        t._times.push(t._lastTime = 0),
        t.interval = t._interval)
    }
    ,
    t.reset = function() {
        if (t._raf) {
            var e = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            e && e(t._timerId)
        } else
            clearTimeout(t._timerId);
        t.removeAllEventListeners("tick"),
        t._timerId = t._times = t._tickTimes = null,
        t._startTime = t._lastTime = t._ticks = 0,
        t._inited = !1
    }
    ,
    t.getMeasuredTickTime = function(e) {
        var i = 0
            , s = t._tickTimes;
        if (!s || s.length < 1)
            return -1;
        e = Math.min(s.length, e || 0 | t.getFPS());
        for (var n = 0; e > n; n++)
            i += s[n];
        return i / e
    }
    ,
    t.getMeasuredFPS = function(e) {
        var i = t._times;
        return !i || i.length < 2 ? -1 : (e = Math.min(i.length - 1, e || 0 | t.getFPS()),
        1e3 / ((i[0] - i[e]) / e))
    }
    ,
    t.setPaused = function(e) {
        t.paused = e
    }
    ,
    t.getPaused = function() {
        return t.paused
    }
    ,
    t.getTime = function(e) {
        return t._startTime ? t._getTime() - (e ? t._pausedTime : 0) : -1
    }
    ,
    t.getEventTime = function(e) {
        return t._startTime ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0) : -1
    }
    ,
    t.getTicks = function(e) {
        return t._ticks - (e ? t._pausedTicks : 0)
    }
    ,
    t._handleSynch = function() {
        t._timerId = null,
        t._setupTick(),
        t._getTime() - t._lastTime >= .97 * (t._interval - 1) && t._tick()
    }
    ,
    t._handleRAF = function() {
        t._timerId = null,
        t._setupTick(),
        t._tick()
    }
    ,
    t._handleTimeout = function() {
        t._timerId = null,
        t._setupTick(),
        t._tick()
    }
    ,
    t._setupTick = function() {
        if (null == t._timerId) {
            var e = t.timingMode || t.useRAF && t.RAF_SYNCHED;
            if (e == t.RAF_SYNCHED || e == t.RAF) {
                var i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (i)
                    return t._timerId = i(e == t.RAF ? t._handleRAF : t._handleSynch),
                    void (t._raf = !0)
            }
            t._raf = !1,
            t._timerId = setTimeout(t._handleTimeout, t._interval)
        }
    }
    ,
    t._tick = function() {
        var e = t.paused
            , i = t._getTime()
            , s = i - t._lastTime;
        if (t._lastTime = i,
        t._ticks++,
        e && (t._pausedTicks++,
        t._pausedTime += s),
        t.hasEventListener("tick")) {
            var n = new createjs.Event("tick")
                , r = t.maxDelta;
            n.delta = r && s > r ? r : s,
            n.paused = e,
            n.time = i,
            n.runTime = i - t._pausedTime,
            t.dispatchEvent(n)
        }
        for (t._tickTimes.unshift(t._getTime() - i); t._tickTimes.length > 100; )
            t._tickTimes.pop();
        for (t._times.unshift(i); t._times.length > 100; )
            t._times.pop()
    }
    ;
    var i = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow);
    t._getTime = function() {
        return (i && i.call(performance) || (new Date).getTime()) - t._startTime
    }
    ,
    createjs.Ticker = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        throw "UID cannot be instantiated"
    }
    t._nextID = 0,
    t.get = function() {
        return t._nextID++
    }
    ,
    createjs.UID = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s, n, r, o, a, h, l) {
        this.Event_constructor(t, e, i),
        this.stageX = s,
        this.stageY = n,
        this.rawX = null == h ? s : h,
        this.rawY = null == l ? n : l,
        this.nativeEvent = r,
        this.pointerID = o,
        this.primary = !!a
    }
    var e = createjs.extend(t, createjs.Event);
    e._get_localX = function() {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).x
    }
    ,
    e._get_localY = function() {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).y
    }
    ,
    e._get_isTouch = function() {
        return -1 !== this.pointerID
    }
    ;
    try {
        Object.defineProperties(e, {
            localX: {
                get: e._get_localX
            },
            localY: {
                get: e._get_localY
            },
            isTouch: {
                get: e._get_isTouch
            }
        })
    } catch (i) {}
    e.clone = function() {
        return new t(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)
    }
    ,
    e.toString = function() {
        return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]"
    }
    ,
    createjs.MouseEvent = createjs.promote(t, "Event")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s, n, r) {
        this.setValues(t, e, i, s, n, r)
    }
    var e = t.prototype;
    t.DEG_TO_RAD = Math.PI / 180,
    t.identity = null,
    e.setValues = function(t, e, i, s, n, r) {
        return this.a = null == t ? 1 : t,
        this.b = e || 0,
        this.c = i || 0,
        this.d = null == s ? 1 : s,
        this.tx = n || 0,
        this.ty = r || 0,
        this
    }
    ,
    e.append = function(t, e, i, s, n, r) {
        var o = this.a
            , a = this.b
            , h = this.c
            , l = this.d;
        return (1 != t || 0 != e || 0 != i || 1 != s) && (this.a = o * t + h * e,
        this.b = a * t + l * e,
        this.c = o * i + h * s,
        this.d = a * i + l * s),
        this.tx = o * n + h * r + this.tx,
        this.ty = a * n + l * r + this.ty,
        this
    }
    ,
    e.prepend = function(t, e, i, s, n, r) {
        var o = this.a
            , a = this.c
            , h = this.tx;
        return this.a = t * o + i * this.b,
        this.b = e * o + s * this.b,
        this.c = t * a + i * this.d,
        this.d = e * a + s * this.d,
        this.tx = t * h + i * this.ty + n,
        this.ty = e * h + s * this.ty + r,
        this
    }
    ,
    e.appendMatrix = function(t) {
        return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty)
    }
    ,
    e.prependMatrix = function(t) {
        return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty)
    }
    ,
    e.appendTransform = function(e, i, s, n, r, o, a, h, l) {
        if (r % 360)
            var c = r * t.DEG_TO_RAD
                , u = Math.cos(c)
                , p = Math.sin(c);
        else
            u = 1,
            p = 0;
        return o || a ? (o *= t.DEG_TO_RAD,
        a *= t.DEG_TO_RAD,
        this.append(Math.cos(a), Math.sin(a), -Math.sin(o), Math.cos(o), e, i),
        this.append(u * s, p * s, -p * n, u * n, 0, 0)) : this.append(u * s, p * s, -p * n, u * n, e, i),
        (h || l) && (this.tx -= h * this.a + l * this.c,
        this.ty -= h * this.b + l * this.d),
        this
    }
    ,
    e.prependTransform = function(e, i, s, n, r, o, a, h, l) {
        if (r % 360)
            var c = r * t.DEG_TO_RAD
                , u = Math.cos(c)
                , p = Math.sin(c);
        else
            u = 1,
            p = 0;
        return (h || l) && (this.tx -= h,
        this.ty -= l),
        o || a ? (o *= t.DEG_TO_RAD,
        a *= t.DEG_TO_RAD,
        this.prepend(u * s, p * s, -p * n, u * n, 0, 0),
        this.prepend(Math.cos(a), Math.sin(a), -Math.sin(o), Math.cos(o), e, i)) : this.prepend(u * s, p * s, -p * n, u * n, e, i),
        this
    }
    ,
    e.rotate = function(e) {
        e *= t.DEG_TO_RAD;
        var i = Math.cos(e)
            , s = Math.sin(e)
            , n = this.a
            , r = this.b;
        return this.a = n * i + this.c * s,
        this.b = r * i + this.d * s,
        this.c = -n * s + this.c * i,
        this.d = -r * s + this.d * i,
        this
    }
    ,
    e.skew = function(e, i) {
        return e *= t.DEG_TO_RAD,
        i *= t.DEG_TO_RAD,
        this.append(Math.cos(i), Math.sin(i), -Math.sin(e), Math.cos(e), 0, 0),
        this
    }
    ,
    e.scale = function(t, e) {
        return this.a *= t,
        this.b *= t,
        this.c *= e,
        this.d *= e,
        this
    }
    ,
    e.translate = function(t, e) {
        return this.tx += this.a * t + this.c * e,
        this.ty += this.b * t + this.d * e,
        this
    }
    ,
    e.identity = function() {
        return this.a = this.d = 1,
        this.b = this.c = this.tx = this.ty = 0,
        this
    }
    ,
    e.invert = function() {
        var t = this.a
            , e = this.b
            , i = this.c
            , s = this.d
            , n = this.tx
            , r = t * s - e * i;
        return this.a = s / r,
        this.b = -e / r,
        this.c = -i / r,
        this.d = t / r,
        this.tx = (i * this.ty - s * n) / r,
        this.ty = -(t * this.ty - e * n) / r,
        this
    }
    ,
    e.isIdentity = function() {
        return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d
    }
    ,
    e.equals = function(t) {
        return this.tx === t.tx && this.ty === t.ty && this.a === t.a && this.b === t.b && this.c === t.c && this.d === t.d
    }
    ,
    e.transformPoint = function(t, e, i) {
        return i = i || {},
        i.x = t * this.a + e * this.c + this.tx,
        i.y = t * this.b + e * this.d + this.ty,
        i
    }
    ,
    e.decompose = function(e) {
        null == e && (e = {}),
        e.x = this.tx,
        e.y = this.ty,
        e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b),
        e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var i = Math.atan2(-this.c, this.d)
            , s = Math.atan2(this.b, this.a)
            , n = Math.abs(1 - i / s);
        return 1e-5 > n ? (e.rotation = s / t.DEG_TO_RAD,
        this.a < 0 && this.d >= 0 && (e.rotation += e.rotation <= 0 ? 180 : -180),
        e.skewX = e.skewY = 0) : (e.skewX = i / t.DEG_TO_RAD,
        e.skewY = s / t.DEG_TO_RAD),
        e
    }
    ,
    e.copy = function(t) {
        return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty)
    }
    ,
    e.clone = function() {
        return new t(this.a,this.b,this.c,this.d,this.tx,this.ty)
    }
    ,
    e.toString = function() {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    }
    ,
    t.identity = new t,
    createjs.Matrix2D = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s, n) {
        this.setValues(t, e, i, s, n)
    }
    var e = t.prototype;
    e.setValues = function(t, e, i, s, n) {
        return this.visible = null == t ? !0 : !!t,
        this.alpha = null == e ? 1 : e,
        this.shadow = i,
        this.compositeOperation = i,
        this.matrix = n || this.matrix && this.matrix.identity() || new createjs.Matrix2D,
        this
    }
    ,
    e.append = function(t, e, i, s, n) {
        return this.alpha *= e,
        this.shadow = i || this.shadow,
        this.compositeOperation = s || this.compositeOperation,
        this.visible = this.visible && t,
        n && this.matrix.appendMatrix(n),
        this
    }
    ,
    e.prepend = function(t, e, i, s, n) {
        return this.alpha *= e,
        this.shadow = this.shadow || i,
        this.compositeOperation = this.compositeOperation || s,
        this.visible = this.visible && t,
        n && this.matrix.prependMatrix(n),
        this
    }
    ,
    e.identity = function() {
        return this.visible = !0,
        this.alpha = 1,
        this.shadow = this.compositeOperation = null,
        this.matrix.identity(),
        this
    }
    ,
    e.clone = function() {
        return new t(this.alpha,this.shadow,this.compositeOperation,this.visible,this.matrix.clone())
    }
    ,
    createjs.DisplayProps = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e) {
        this.setValues(t, e)
    }
    var e = t.prototype;
    e.setValues = function(t, e) {
        return this.x = t || 0,
        this.y = e || 0,
        this
    }
    ,
    e.copy = function(t) {
        return this.x = t.x,
        this.y = t.y,
        this
    }
    ,
    e.clone = function() {
        return new t(this.x,this.y)
    }
    ,
    e.toString = function() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
    }
    ,
    createjs.Point = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s) {
        this.setValues(t, e, i, s)
    }
    var e = t.prototype;
    e.setValues = function(t, e, i, s) {
        return this.x = t || 0,
        this.y = e || 0,
        this.width = i || 0,
        this.height = s || 0,
        this
    }
    ,
    e.extend = function(t, e, i, s) {
        return i = i || 0,
        s = s || 0,
        t + i > this.x + this.width && (this.width = t + i - this.x),
        e + s > this.y + this.height && (this.height = e + s - this.y),
        t < this.x && (this.width += this.x - t,
        this.x = t),
        e < this.y && (this.height += this.y - e,
        this.y = e),
        this
    }
    ,
    e.pad = function(t, e, i, s) {
        return this.x -= t,
        this.y -= e,
        this.width += t + i,
        this.height += e + s,
        this
    }
    ,
    e.copy = function(t) {
        return this.setValues(t.x, t.y, t.width, t.height)
    }
    ,
    e.contains = function(t, e, i, s) {
        return i = i || 0,
        s = s || 0,
        t >= this.x && t + i <= this.x + this.width && e >= this.y && e + s <= this.y + this.height
    }
    ,
    e.union = function(t) {
        return this.clone().extend(t.x, t.y, t.width, t.height)
    }
    ,
    e.intersection = function(e) {
        var i = e.x
            , s = e.y
            , n = i + e.width
            , r = s + e.height;
        return this.x > i && (i = this.x),
        this.y > s && (s = this.y),
        this.x + this.width < n && (n = this.x + this.width),
        this.y + this.height < r && (r = this.y + this.height),
        i >= n || s >= r ? null : new t(i,s,n - i,r - s)
    }
    ,
    e.intersects = function(t) {
        return t.x <= this.x + this.width && this.x <= t.x + t.width && t.y <= this.y + this.height && this.y <= t.y + t.height
    }
    ,
    e.isEmpty = function() {
        return this.width <= 0 || this.height <= 0
    }
    ,
    e.clone = function() {
        return new t(this.x,this.y,this.width,this.height)
    }
    ,
    e.toString = function() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
    }
    ,
    createjs.Rectangle = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s, n, r, o) {
        t.addEventListener && (this.target = t,
        this.overLabel = null == i ? "over" : i,
        this.outLabel = null == e ? "out" : e,
        this.downLabel = null == s ? "down" : s,
        this.play = n,
        this._isPressed = !1,
        this._isOver = !1,
        this._enabled = !1,
        t.mouseChildren = !1,
        this.enabled = !0,
        this.handleEvent({}),
        r && (o && (r.actionsEnabled = !1,
        r.gotoAndStop && r.gotoAndStop(o)),
        t.hitArea = r))
    }
    var e = t.prototype;
    e.setEnabled = function(t) {
        if (t != this._enabled) {
            var e = this.target;
            this._enabled = t,
            t ? (e.cursor = "pointer",
            e.addEventListener("rollover", this),
            e.addEventListener("rollout", this),
            e.addEventListener("mousedown", this),
            e.addEventListener("pressup", this)) : (e.cursor = null,
            e.removeEventListener("rollover", this),
            e.removeEventListener("rollout", this),
            e.removeEventListener("mousedown", this),
            e.removeEventListener("pressup", this))
        }
    }
    ,
    e.getEnabled = function() {
        return this._enabled
    }
    ;
    try {
        Object.defineProperties(e, {
            enabled: {
                get: e.getEnabled,
                set: e.setEnabled
            }
        })
    } catch (i) {}
    e.toString = function() {
        return "[ButtonHelper]"
    }
    ,
    e.handleEvent = function(t) {
        var e, i = this.target, s = t.type;
        "mousedown" == s ? (this._isPressed = !0,
        e = this.downLabel) : "pressup" == s ? (this._isPressed = !1,
        e = this._isOver ? this.overLabel : this.outLabel) : "rollover" == s ? (this._isOver = !0,
        e = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1,
        e = this._isPressed ? this.overLabel : this.outLabel),
        this.play ? i.gotoAndPlay && i.gotoAndPlay(e) : i.gotoAndStop && i.gotoAndStop(e)
    }
    ,
    createjs.ButtonHelper = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s) {
        this.color = t || "black",
        this.offsetX = e || 0,
        this.offsetY = i || 0,
        this.blur = s || 0
    }
    var e = t.prototype;
    t.identity = new t("transparent",0,0,0),
    e.toString = function() {
        return "[Shadow]"
    }
    ,
    e.clone = function() {
        return new t(this.color,this.offsetX,this.offsetY,this.blur)
    }
    ,
    createjs.Shadow = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t) {
        this.EventDispatcher_constructor(),
        this.complete = !0,
        this.framerate = 0,
        this._animations = null,
        this._frames = null,
        this._images = null,
        this._data = null,
        this._loadCount = 0,
        this._frameHeight = 0,
        this._frameWidth = 0,
        this._numFrames = 0,
        this._regX = 0,
        this._regY = 0,
        this._spacing = 0,
        this._margin = 0,
        this._parseData(t)
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    e.getAnimations = function() {
        return this._animations.slice()
    }
    ;
    try {
        Object.defineProperties(e, {
            animations: {
                get: e.getAnimations
            }
        })
    } catch (i) {}
    e.getNumFrames = function(t) {
        if (null == t)
            return this._frames ? this._frames.length : this._numFrames || 0;
        var e = this._data[t];
        return null == e ? 0 : e.frames.length
    }
    ,
    e.getAnimation = function(t) {
        return this._data[t]
    }
    ,
    e.getFrame = function(t) {
        var e;
        return this._frames && (e = this._frames[t]) ? e : null
    }
    ,
    e.getFrameBounds = function(t, e) {
        var i = this.getFrame(t);
        return i ? (e || new createjs.Rectangle).setValues(-i.regX, -i.regY, i.rect.width, i.rect.height) : null
    }
    ,
    e.toString = function() {
        return "[SpriteSheet]"
    }
    ,
    e.clone = function() {
        throw "SpriteSheet cannot be cloned."
    }
    ,
    e._parseData = function(t) {
        var e, i, s, n;
        if (null != t) {
            if (this.framerate = t.framerate || 0,
            t.images && (i = t.images.length) > 0)
                for (n = this._images = [],
                e = 0; i > e; e++) {
                    var r = t.images[e];
                    if ("string" == typeof r) {
                        var o = r;
                        r = document.createElement("img"),
                        r.src = o
                    }
                    n.push(r),
                    r.getContext || r.complete || (this._loadCount++,
                    this.complete = !1,
                    function(t) {
                        r.onload = function() {
                            t._handleImageLoad()
                        }
                    }(this))
                }
            if (null == t.frames)
                ;
            else if (t.frames instanceof Array)
                for (this._frames = [],
                n = t.frames,
                e = 0,
                i = n.length; i > e; e++) {
                    var a = n[e];
                    this._frames.push({
                        image: this._images[a[4] ? a[4] : 0],
                        rect: new createjs.Rectangle(a[0],a[1],a[2],a[3]),
                        regX: a[5] || 0,
                        regY: a[6] || 0
                    })
                }
            else
                s = t.frames,
                this._frameWidth = s.width,
                this._frameHeight = s.height,
                this._regX = s.regX || 0,
                this._regY = s.regY || 0,
                this._spacing = s.spacing || 0,
                this._margin = s.margin || 0,
                this._numFrames = s.count,
                0 == this._loadCount && this._calculateFrames();
            if (this._animations = [],
            null != (s = t.animations)) {
                this._data = {};
                var h;
                for (h in s) {
                    var l = {
                        name: h
                    }
                        , c = s[h];
                    if ("number" == typeof c)
                        n = l.frames = [c];
                    else if (c instanceof Array)
                        if (1 == c.length)
                            l.frames = [c[0]];
                        else
                            for (l.speed = c[3],
                            l.next = c[2],
                            n = l.frames = [],
                            e = c[0]; e <= c[1]; e++)
                                n.push(e);
                    else {
                        l.speed = c.speed,
                        l.next = c.next;
                        var u = c.frames;
                        n = l.frames = "number" == typeof u ? [u] : u.slice(0)
                    }
                    (l.next === !0 || void 0 === l.next) && (l.next = h),
                    (l.next === !1 || n.length < 2 && l.next == h) && (l.next = null),
                    l.speed || (l.speed = 1),
                    this._animations.push(h),
                    this._data[h] = l
                }
            }
        }
    }
    ,
    e._handleImageLoad = function() {
        0 == --this._loadCount && (this._calculateFrames(),
        this.complete = !0,
        this.dispatchEvent("complete"))
    }
    ,
    e._calculateFrames = function() {
        if (!this._frames && 0 != this._frameWidth) {
            this._frames = [];
            var t = this._numFrames || 1e5
                , e = 0
                , i = this._frameWidth
                , s = this._frameHeight
                , n = this._spacing
                , r = this._margin;
            t: for (var o = 0, a = this._images; o < a.length; o++)
                for (var h = a[o], l = h.width, c = h.height, u = r; c - r - s >= u; ) {
                    for (var p = r; l - r - i >= p; ) {
                        if (e >= t)
                            break t;
                        e++,
                        this._frames.push({
                            image: h,
                            rect: new createjs.Rectangle(p,u,i,s),
                            regX: this._regX,
                            regY: this._regY
                        }),
                        p += i + n
                    }
                    u += s + n
                }
            this._numFrames = e
        }
    }
    ,
    createjs.SpriteSheet = createjs.promote(t, "EventDispatcher")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        this.command = null,
        this._stroke = null,
        this._strokeStyle = null,
        this._oldStrokeStyle = null,
        this._strokeDash = null,
        this._oldStrokeDash = null,
        this._strokeIgnoreScale = !1,
        this._fill = null,
        this._instructions = [],
        this._commitIndex = 0,
        this._activeInstructions = [],
        this._dirty = !1,
        this._storeIndex = 0,
        this.clear()
    }
    var e = t.prototype
        , i = t;
    t.getRGB = function(t, e, i, s) {
        return null != t && null == i && (s = e,
        i = 255 & t,
        e = t >> 8 & 255,
        t = t >> 16 & 255),
        null == s ? "rgb(" + t + "," + e + "," + i + ")" : "rgba(" + t + "," + e + "," + i + "," + s + ")"
    }
    ,
    t.getHSL = function(t, e, i, s) {
        return null == s ? "hsl(" + t % 360 + "," + e + "%," + i + "%)" : "hsla(" + t % 360 + "," + e + "%," + i + "%," + s + ")"
    }
    ,
    t.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63
    },
    t.STROKE_CAPS_MAP = ["butt", "round", "square"],
    t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
    var s = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    s.getContext && (t._ctx = s.getContext("2d"),
    s.width = s.height = 1),
    e.getInstructions = function() {
        return this._updateInstructions(),
        this._instructions
    }
    ;
    try {
        Object.defineProperties(e, {
            instructions: {
                get: e.getInstructions
            }
        })
    } catch (n) {}
    e.isEmpty = function() {
        return !(this._instructions.length || this._activeInstructions.length)
    }
    ,
    e.draw = function(t, e) {
        this._updateInstructions();
        for (var i = this._instructions, s = this._storeIndex, n = i.length; n > s; s++)
            i[s].exec(t, e)
    }
    ,
    e.drawAsPath = function(t) {
        this._updateInstructions();
        for (var e, i = this._instructions, s = this._storeIndex, n = i.length; n > s; s++)
            (e = i[s]).path !== !1 && e.exec(t)
    }
    ,
    e.moveTo = function(t, e) {
        return this.append(new i.MoveTo(t,e), !0)
    }
    ,
    e.lineTo = function(t, e) {
        return this.append(new i.LineTo(t,e))
    }
    ,
    e.arcTo = function(t, e, s, n, r) {
        return this.append(new i.ArcTo(t,e,s,n,r))
    }
    ,
    e.arc = function(t, e, s, n, r, o) {
        return this.append(new i.Arc(t,e,s,n,r,o))
    }
    ,
    e.quadraticCurveTo = function(t, e, s, n) {
        return this.append(new i.QuadraticCurveTo(t,e,s,n))
    }
    ,
    e.bezierCurveTo = function(t, e, s, n, r, o) {
        return this.append(new i.BezierCurveTo(t,e,s,n,r,o))
    }
    ,
    e.rect = function(t, e, s, n) {
        return this.append(new i.Rect(t,e,s,n))
    }
    ,
    e.closePath = function() {
        return this._activeInstructions.length ? this.append(new i.ClosePath) : this
    }
    ,
    e.clear = function() {
        return this._instructions.length = this._activeInstructions.length = this._commitIndex = 0,
        this._strokeStyle = this._stroke = this._fill = this._strokeDash = null,
        this._dirty = this._strokeIgnoreScale = !1,
        this
    }
    ,
    e.beginFill = function(t) {
        return this._setFill(t ? new i.Fill(t) : null)
    }
    ,
    e.beginLinearGradientFill = function(t, e, s, n, r, o) {
        return this._setFill((new i.Fill).linearGradient(t, e, s, n, r, o))
    }
    ,
    e.beginRadialGradientFill = function(t, e, s, n, r, o, a, h) {
        return this._setFill((new i.Fill).radialGradient(t, e, s, n, r, o, a, h))
    }
    ,
    e.beginBitmapFill = function(t, e, s) {
        return this._setFill(new i.Fill(null,s).bitmap(t, e))
    }
    ,
    e.endFill = function() {
        return this.beginFill()
    }
    ,
    e.setStrokeStyle = function(t, e, s, n, r) {
        return this._updateInstructions(!0),
        this._strokeStyle = this.command = new i.StrokeStyle(t,e,s,n,r),
        this._stroke && (this._stroke.ignoreScale = r),
        this._strokeIgnoreScale = r,
        this
    }
    ,
    e.setStrokeDash = function(t, e) {
        return this._updateInstructions(!0),
        this._strokeDash = this.command = new i.StrokeDash(t,e),
        this
    }
    ,
    e.beginStroke = function(t) {
        return this._setStroke(t ? new i.Stroke(t) : null)
    }
    ,
    e.beginLinearGradientStroke = function(t, e, s, n, r, o) {
        return this._setStroke((new i.Stroke).linearGradient(t, e, s, n, r, o))
    }
    ,
    e.beginRadialGradientStroke = function(t, e, s, n, r, o, a, h) {
        return this._setStroke((new i.Stroke).radialGradient(t, e, s, n, r, o, a, h))
    }
    ,
    e.beginBitmapStroke = function(t, e) {
        return this._setStroke((new i.Stroke).bitmap(t, e))
    }
    ,
    e.endStroke = function() {
        return this.beginStroke()
    }
    ,
    e.curveTo = e.quadraticCurveTo,
    e.drawRect = e.rect,
    e.drawRoundRect = function(t, e, i, s, n) {
        return this.drawRoundRectComplex(t, e, i, s, n, n, n, n)
    }
    ,
    e.drawRoundRectComplex = function(t, e, s, n, r, o, a, h) {
        return this.append(new i.RoundRect(t,e,s,n,r,o,a,h))
    }
    ,
    e.drawCircle = function(t, e, s) {
        return this.append(new i.Circle(t,e,s))
    }
    ,
    e.drawEllipse = function(t, e, s, n) {
        return this.append(new i.Ellipse(t,e,s,n))
    }
    ,
    e.drawPolyStar = function(t, e, s, n, r, o) {
        return this.append(new i.PolyStar(t,e,s,n,r,o))
    }
    ,
    e.append = function(t, e) {
        return this._activeInstructions.push(t),
        this.command = t,
        e || (this._dirty = !0),
        this
    }
    ,
    e.decodePath = function(e) {
        for (var i = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], s = [2, 2, 4, 6, 0], n = 0, r = e.length, o = [], a = 0, h = 0, l = t.BASE_64; r > n; ) {
            var c = e.charAt(n)
                , u = l[c]
                , p = u >> 3
                , d = i[p];
            if (!d || 3 & u)
                throw "bad path data (@" + n + "): " + c;
            var f = s[p];
            p || (a = h = 0),
            o.length = 0,
            n++;
            for (var v = (u >> 2 & 1) + 2, g = 0; f > g; g++) {
                var m = l[e.charAt(n)]
                    , y = m >> 5 ? -1 : 1;
                m = (31 & m) << 6 | l[e.charAt(n + 1)],
                3 == v && (m = m << 6 | l[e.charAt(n + 2)]),
                m = y * m / 10,
                g % 2 ? a = m += a : h = m += h,
                o[g] = m,
                n += v
            }
            d.apply(this, o)
        }
        return this
    }
    ,
    e.store = function() {
        return this._updateInstructions(!0),
        this._storeIndex = this._instructions.length,
        this
    }
    ,
    e.unstore = function() {
        return this._storeIndex = 0,
        this
    }
    ,
    e.clone = function() {
        var e = new t;
        return e.command = this.command,
        e._stroke = this._stroke,
        e._strokeStyle = this._strokeStyle,
        e._strokeDash = this._strokeDash,
        e._strokeIgnoreScale = this._strokeIgnoreScale,
        e._fill = this._fill,
        e._instructions = this._instructions.slice(),
        e._commitIndex = this._commitIndex,
        e._activeInstructions = this._activeInstructions.slice(),
        e._dirty = this._dirty,
        e._storeIndex = this._storeIndex,
        e
    }
    ,
    e.toString = function() {
        return "[Graphics]"
    }
    ,
    e.mt = e.moveTo,
    e.lt = e.lineTo,
    e.at = e.arcTo,
    e.bt = e.bezierCurveTo,
    e.qt = e.quadraticCurveTo,
    e.a = e.arc,
    e.r = e.rect,
    e.cp = e.closePath,
    e.c = e.clear,
    e.f = e.beginFill,
    e.lf = e.beginLinearGradientFill,
    e.rf = e.beginRadialGradientFill,
    e.bf = e.beginBitmapFill,
    e.ef = e.endFill,
    e.ss = e.setStrokeStyle,
    e.sd = e.setStrokeDash,
    e.s = e.beginStroke,
    e.ls = e.beginLinearGradientStroke,
    e.rs = e.beginRadialGradientStroke,
    e.bs = e.beginBitmapStroke,
    e.es = e.endStroke,
    e.dr = e.drawRect,
    e.rr = e.drawRoundRect,
    e.rc = e.drawRoundRectComplex,
    e.dc = e.drawCircle,
    e.de = e.drawEllipse,
    e.dp = e.drawPolyStar,
    e.p = e.decodePath,
    e._updateInstructions = function(e) {
        var i = this._instructions
            , s = this._activeInstructions
            , n = this._commitIndex;
        if (this._dirty && s.length) {
            i.length = n,
            i.push(t.beginCmd);
            var r = s.length
                , o = i.length;
            i.length = o + r;
            for (var a = 0; r > a; a++)
                i[a + o] = s[a];
            this._fill && i.push(this._fill),
            this._stroke && (this._strokeDash !== this._oldStrokeDash && (this._oldStrokeDash = this._strokeDash,
            i.push(this._strokeDash)),
            this._strokeStyle !== this._oldStrokeStyle && (this._oldStrokeStyle = this._strokeStyle,
            i.push(this._strokeStyle)),
            i.push(this._stroke)),
            this._dirty = !1
        }
        e && (s.length = 0,
        this._commitIndex = i.length)
    }
    ,
    e._setFill = function(t) {
        return this._updateInstructions(!0),
        this.command = this._fill = t,
        this
    }
    ,
    e._setStroke = function(t) {
        return this._updateInstructions(!0),
        (this.command = this._stroke = t) && (t.ignoreScale = this._strokeIgnoreScale),
        this
    }
    ,
    (i.LineTo = function(t, e) {
        this.x = t,
        this.y = e
    }
    ).prototype.exec = function(t) {
        t.lineTo(this.x, this.y)
    }
    ,
    (i.MoveTo = function(t, e) {
        this.x = t,
        this.y = e
    }
    ).prototype.exec = function(t) {
        t.moveTo(this.x, this.y)
    }
    ,
    (i.ArcTo = function(t, e, i, s, n) {
        this.x1 = t,
        this.y1 = e,
        this.x2 = i,
        this.y2 = s,
        this.radius = n
    }
    ).prototype.exec = function(t) {
        t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius)
    }
    ,
    (i.Arc = function(t, e, i, s, n, r) {
        this.x = t,
        this.y = e,
        this.radius = i,
        this.startAngle = s,
        this.endAngle = n,
        this.anticlockwise = !!r
    }
    ).prototype.exec = function(t) {
        t.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
    }
    ,
    (i.QuadraticCurveTo = function(t, e, i, s) {
        this.cpx = t,
        this.cpy = e,
        this.x = i,
        this.y = s
    }
    ).prototype.exec = function(t) {
        t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y)
    }
    ,
    (i.BezierCurveTo = function(t, e, i, s, n, r) {
        this.cp1x = t,
        this.cp1y = e,
        this.cp2x = i,
        this.cp2y = s,
        this.x = n,
        this.y = r
    }
    ).prototype.exec = function(t) {
        t.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y)
    }
    ,
    (i.Rect = function(t, e, i, s) {
        this.x = t,
        this.y = e,
        this.w = i,
        this.h = s
    }
    ).prototype.exec = function(t) {
        t.rect(this.x, this.y, this.w, this.h)
    }
    ,
    (i.ClosePath = function() {}
    ).prototype.exec = function(t) {
        t.closePath()
    }
    ,
    (i.BeginPath = function() {}
    ).prototype.exec = function(t) {
        t.beginPath()
    }
    ,
    e = (i.Fill = function(t, e) {
        this.style = t,
        this.matrix = e
    }
    ).prototype,
    e.exec = function(t) {
        if (this.style) {
            t.fillStyle = this.style;
            var e = this.matrix;
            e && (t.save(),
            t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)),
            t.fill(),
            e && t.restore()
        }
    }
    ,
    e.linearGradient = function(e, i, s, n, r, o) {
        for (var a = this.style = t._ctx.createLinearGradient(s, n, r, o), h = 0, l = e.length; l > h; h++)
            a.addColorStop(i[h], e[h]);
        return a.props = {
            colors: e,
            ratios: i,
            x0: s,
            y0: n,
            x1: r,
            y1: o,
            type: "linear"
        },
        this
    }
    ,
    e.radialGradient = function(e, i, s, n, r, o, a, h) {
        for (var l = this.style = t._ctx.createRadialGradient(s, n, r, o, a, h), c = 0, u = e.length; u > c; c++)
            l.addColorStop(i[c], e[c]);
        return l.props = {
            colors: e,
            ratios: i,
            x0: s,
            y0: n,
            r0: r,
            x1: o,
            y1: a,
            r1: h,
            type: "radial"
        },
        this
    }
    ,
    e.bitmap = function(e, i) {
        var s = this.style = t._ctx.createPattern(e, i || "");
        return s.props = {
            image: e,
            repetition: i,
            type: "bitmap"
        },
        this
    }
    ,
    e.path = !1,
    e = (i.Stroke = function(t, e) {
        this.style = t,
        this.ignoreScale = e
    }
    ).prototype,
    e.exec = function(t) {
        this.style && (t.strokeStyle = this.style,
        this.ignoreScale && (t.save(),
        t.setTransform(1, 0, 0, 1, 0, 0)),
        t.stroke(),
        this.ignoreScale && t.restore())
    }
    ,
    e.linearGradient = i.Fill.prototype.linearGradient,
    e.radialGradient = i.Fill.prototype.radialGradient,
    e.bitmap = i.Fill.prototype.bitmap,
    e.path = !1,
    e = (i.StrokeStyle = function(t, e, i, s) {
        this.width = t,
        this.caps = e,
        this.joints = i,
        this.miterLimit = s
    }
    ).prototype,
    e.exec = function(e) {
        e.lineWidth = null == this.width ? "1" : this.width,
        e.lineCap = null == this.caps ? "butt" : isNaN(this.caps) ? this.caps : t.STROKE_CAPS_MAP[this.caps],
        e.lineJoin = null == this.joints ? "miter" : isNaN(this.joints) ? this.joints : t.STROKE_JOINTS_MAP[this.joints],
        e.miterLimit = null == this.miterLimit ? "10" : this.miterLimit
    }
    ,
    e.path = !1,
    (i.StrokeDash = function(t, e) {
        this.segments = t,
        this.offset = e || 0
    }
    ).prototype.exec = function(t) {
        t.setLineDash && (t.setLineDash(this.segments || i.StrokeDash.EMPTY_SEGMENTS),
        t.lineDashOffset = this.offset || 0)
    }
    ,
    i.StrokeDash.EMPTY_SEGMENTS = [],
    (i.RoundRect = function(t, e, i, s, n, r, o, a) {
        this.x = t,
        this.y = e,
        this.w = i,
        this.h = s,
        this.radiusTL = n,
        this.radiusTR = r,
        this.radiusBR = o,
        this.radiusBL = a
    }
    ).prototype.exec = function(t) {
        var e = (l > h ? h : l) / 2
            , i = 0
            , s = 0
            , n = 0
            , r = 0
            , o = this.x
            , a = this.y
            , h = this.w
            , l = this.h
            , c = this.radiusTL
            , u = this.radiusTR
            , p = this.radiusBR
            , d = this.radiusBL;
        0 > c && (c *= i = -1),
        c > e && (c = e),
        0 > u && (u *= s = -1),
        u > e && (u = e),
        0 > p && (p *= n = -1),
        p > e && (p = e),
        0 > d && (d *= r = -1),
        d > e && (d = e),
        t.moveTo(o + h - u, a),
        t.arcTo(o + h + u * s, a - u * s, o + h, a + u, u),
        t.lineTo(o + h, a + l - p),
        t.arcTo(o + h + p * n, a + l + p * n, o + h - p, a + l, p),
        t.lineTo(o + d, a + l),
        t.arcTo(o - d * r, a + l + d * r, o, a + l - d, d),
        t.lineTo(o, a + c),
        t.arcTo(o - c * i, a - c * i, o + c, a, c),
        t.closePath()
    }
    ,
    (i.Circle = function(t, e, i) {
        this.x = t,
        this.y = e,
        this.radius = i
    }
    ).prototype.exec = function(t) {
        t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    }
    ,
    (i.Ellipse = function(t, e, i, s) {
        this.x = t,
        this.y = e,
        this.w = i,
        this.h = s
    }
    ).prototype.exec = function(t) {
        var e = this.x
            , i = this.y
            , s = this.w
            , n = this.h
            , r = .5522848
            , o = s / 2 * r
            , a = n / 2 * r
            , h = e + s
            , l = i + n
            , c = e + s / 2
            , u = i + n / 2;
        t.moveTo(e, u),
        t.bezierCurveTo(e, u - a, c - o, i, c, i),
        t.bezierCurveTo(c + o, i, h, u - a, h, u),
        t.bezierCurveTo(h, u + a, c + o, l, c, l),
        t.bezierCurveTo(c - o, l, e, u + a, e, u)
    }
    ,
    (i.PolyStar = function(t, e, i, s, n, r) {
        this.x = t,
        this.y = e,
        this.radius = i,
        this.sides = s,
        this.pointSize = n,
        this.angle = r
    }
    ).prototype.exec = function(t) {
        var e = this.x
            , i = this.y
            , s = this.radius
            , n = (this.angle || 0) / 180 * Math.PI
            , r = this.sides
            , o = 1 - (this.pointSize || 0)
            , a = Math.PI / r;
        t.moveTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        for (var h = 0; r > h; h++)
            n += a,
            1 != o && t.lineTo(e + Math.cos(n) * s * o, i + Math.sin(n) * s * o),
            n += a,
            t.lineTo(e + Math.cos(n) * s, i + Math.sin(n) * s);
        t.closePath()
    }
    ,
    t.beginCmd = new i.BeginPath,
    createjs.Graphics = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        this.EventDispatcher_constructor(),
        this.alpha = 1,
        this.cacheCanvas = null,
        this.cacheID = 0,
        this.id = createjs.UID.get(),
        this.mouseEnabled = !0,
        this.tickEnabled = !0,
        this.name = null,
        this.parent = null,
        this.regX = 0,
        this.regY = 0,
        this.rotation = 0,
        this.scaleX = 1,
        this.scaleY = 1,
        this.skewX = 0,
        this.skewY = 0,
        this.shadow = null,
        this.visible = !0,
        this.x = 0,
        this.y = 0,
        this.transformMatrix = null,
        this.compositeOperation = null,
        this.snapToPixel = !0,
        this.filters = null,
        this.mask = null,
        this.hitArea = null,
        this.cursor = null,
        this._cacheOffsetX = 0,
        this._cacheOffsetY = 0,
        this._filterOffsetX = 0,
        this._filterOffsetY = 0,
        this._cacheScale = 1,
        this._cacheDataURLID = 0,
        this._cacheDataURL = null,
        this._props = new createjs.DisplayProps,
        this._rectangle = new createjs.Rectangle,
        this._bounds = null
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    t._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"],
    t.suppressCrossDomainErrors = !1,
    t._snapToPixelEnabled = !1;
    var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    i.getContext && (t._hitTestCanvas = i,
    t._hitTestContext = i.getContext("2d"),
    i.width = i.height = 1),
    t._nextCacheID = 1,
    e.getStage = function() {
        for (var t = this, e = createjs.Stage; t.parent; )
            t = t.parent;
        return t instanceof e ? t : null
    }
    ;
    try {
        Object.defineProperties(e, {
            stage: {
                get: e.getStage
            }
        })
    } catch (s) {}
    e.isVisible = function() {
        return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY)
    }
    ,
    e.draw = function(t, e) {
        var i = this.cacheCanvas;
        if (e || !i)
            return !1;
        var s = this._cacheScale;
        return t.drawImage(i, this._cacheOffsetX + this._filterOffsetX, this._cacheOffsetY + this._filterOffsetY, i.width / s, i.height / s),
        !0
    }
    ,
    e.updateContext = function(e) {
        var i = this
            , s = i.mask
            , n = i._props.matrix;
        s && s.graphics && !s.graphics.isEmpty() && (s.getMatrix(n),
        e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty),
        s.graphics.drawAsPath(e),
        e.clip(),
        n.invert(),
        e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty)),
        this.getMatrix(n);
        var r = n.tx
            , o = n.ty;
        t._snapToPixelEnabled && i.snapToPixel && (r = r + (0 > r ? -.5 : .5) | 0,
        o = o + (0 > o ? -.5 : .5) | 0),
        e.transform(n.a, n.b, n.c, n.d, r, o),
        e.globalAlpha *= i.alpha,
        i.compositeOperation && (e.globalCompositeOperation = i.compositeOperation),
        i.shadow && this._applyShadow(e, i.shadow)
    }
    ,
    e.cache = function(t, e, i, s, n) {
        n = n || 1,
        this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")),
        this._cacheWidth = i,
        this._cacheHeight = s,
        this._cacheOffsetX = t,
        this._cacheOffsetY = e,
        this._cacheScale = n,
        this.updateCache()
    }
    ,
    e.updateCache = function(e) {
        var i = this.cacheCanvas;
        if (!i)
            throw "cache() must be called before updateCache()";
        var s = this._cacheScale
            , n = this._cacheOffsetX * s
            , r = this._cacheOffsetY * s
            , o = this._cacheWidth
            , a = this._cacheHeight
            , h = i.getContext("2d")
            , l = this._getFilterBounds();
        n += this._filterOffsetX = l.x,
        r += this._filterOffsetY = l.y,
        o = Math.ceil(o * s) + l.width,
        a = Math.ceil(a * s) + l.height,
        o != i.width || a != i.height ? (i.width = o,
        i.height = a) : e || h.clearRect(0, 0, o + 1, a + 1),
        h.save(),
        h.globalCompositeOperation = e,
        h.setTransform(s, 0, 0, s, -n, -r),
        this.draw(h, !0),
        this._applyFilters(),
        h.restore(),
        this.cacheID = t._nextCacheID++
    }
    ,
    e.uncache = function() {
        this._cacheDataURL = this.cacheCanvas = null,
        this.cacheID = this._cacheOffsetX = this._cacheOffsetY = this._filterOffsetX = this._filterOffsetY = 0,
        this._cacheScale = 1
    }
    ,
    e.getCacheDataURL = function() {
        return this.cacheCanvas ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL()),
        this._cacheDataURL) : null
    }
    ,
    e.localToGlobal = function(t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix).transformPoint(t, e, i || new createjs.Point)
    }
    ,
    e.globalToLocal = function(t, e, i) {
        return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(t, e, i || new createjs.Point)
    }
    ,
    e.localToLocal = function(t, e, i, s) {
        return s = this.localToGlobal(t, e, s),
        i.globalToLocal(s.x, s.y, s)
    }
    ,
    e.setTransform = function(t, e, i, s, n, r, o, a, h) {
        return this.x = t || 0,
        this.y = e || 0,
        this.scaleX = null == i ? 1 : i,
        this.scaleY = null == s ? 1 : s,
        this.rotation = n || 0,
        this.skewX = r || 0,
        this.skewY = o || 0,
        this.regX = a || 0,
        this.regY = h || 0,
        this
    }
    ,
    e.getMatrix = function(t) {
        var e = this
            , i = t && t.identity() || new createjs.Matrix2D;
        return e.transformMatrix ? i.copy(e.transformMatrix) : i.appendTransform(e.x, e.y, e.scaleX, e.scaleY, e.rotation, e.skewX, e.skewY, e.regX, e.regY)
    }
    ,
    e.getConcatenatedMatrix = function(t) {
        for (var e = this, i = this.getMatrix(t); e = e.parent; )
            i.prependMatrix(e.getMatrix(e._props.matrix));
        return i
    }
    ,
    e.getConcatenatedDisplayProps = function(t) {
        t = t ? t.identity() : new createjs.DisplayProps;
        var e = this
            , i = e.getMatrix(t.matrix);
        do
            t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
            e != this && i.prependMatrix(e.getMatrix(e._props.matrix));
        while (e = e.parent);
        return t
    }
    ,
    e.hitTest = function(e, i) {
        var s = t._hitTestContext;
        s.setTransform(1, 0, 0, 1, -e, -i),
        this.draw(s);
        var n = this._testHit(s);
        return s.setTransform(1, 0, 0, 1, 0, 0),
        s.clearRect(0, 0, 2, 2),
        n
    }
    ,
    e.set = function(t) {
        for (var e in t)
            this[e] = t[e];
        return this
    }
    ,
    e.getBounds = function() {
        if (this._bounds)
            return this._rectangle.copy(this._bounds);
        var t = this.cacheCanvas;
        if (t) {
            var e = this._cacheScale;
            return this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, t.width / e, t.height / e)
        }
        return null
    }
    ,
    e.getTransformedBounds = function() {
        return this._getBounds()
    }
    ,
    e.setBounds = function(t, e, i, s) {
        null == t && (this._bounds = t),
        this._bounds = (this._bounds || new createjs.Rectangle).setValues(t, e, i, s)
    }
    ,
    e.clone = function() {
        return this._cloneProps(new t)
    }
    ,
    e.toString = function() {
        return "[DisplayObject (name=" + this.name + ")]"
    }
    ,
    e._cloneProps = function(t) {
        return t.alpha = this.alpha,
        t.mouseEnabled = this.mouseEnabled,
        t.tickEnabled = this.tickEnabled,
        t.name = this.name,
        t.regX = this.regX,
        t.regY = this.regY,
        t.rotation = this.rotation,
        t.scaleX = this.scaleX,
        t.scaleY = this.scaleY,
        t.shadow = this.shadow,
        t.skewX = this.skewX,
        t.skewY = this.skewY,
        t.visible = this.visible,
        t.x = this.x,
        t.y = this.y,
        t.compositeOperation = this.compositeOperation,
        t.snapToPixel = this.snapToPixel,
        t.filters = null == this.filters ? null : this.filters.slice(0),
        t.mask = this.mask,
        t.hitArea = this.hitArea,
        t.cursor = this.cursor,
        t._bounds = this._bounds,
        t
    }
    ,
    e._applyShadow = function(t, e) {
        e = e || Shadow.identity,
        t.shadowColor = e.color,
        t.shadowOffsetX = e.offsetX,
        t.shadowOffsetY = e.offsetY,
        t.shadowBlur = e.blur
    }
    ,
    e._tick = function(t) {
        var e = this._listeners;
        e && e.tick && (t.target = null,
        t.propagationStopped = t.immediatePropagationStopped = !1,
        this.dispatchEvent(t))
    }
    ,
    e._testHit = function(e) {
        try {
            var i = e.getImageData(0, 0, 1, 1).data[3] > 1
        } catch (s) {
            if (!t.suppressCrossDomainErrors)
                throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
        }
        return i
    }
    ,
    e._applyFilters = function() {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
            for (var t = this.filters.length, e = this.cacheCanvas.getContext("2d"), i = this.cacheCanvas.width, s = this.cacheCanvas.height, n = 0; t > n; n++)
                this.filters[n].applyFilter(e, 0, 0, i, s)
    }
    ,
    e._getFilterBounds = function() {
        var t, e = this.filters, i = this._rectangle.setValues(0, 0, 0, 0);
        if (!e || !(t = e.length))
            return i;
        for (var s = 0; t > s; s++) {
            var n = this.filters[s];
            n.getBounds && n.getBounds(i)
        }
        return i
    }
    ,
    e._getBounds = function(t, e) {
        return this._transformBounds(this.getBounds(), t, e)
    }
    ,
    e._transformBounds = function(t, e, i) {
        if (!t)
            return t;
        var s = t.x
            , n = t.y
            , r = t.width
            , o = t.height
            , a = this._props.matrix;
        a = i ? a.identity() : this.getMatrix(a),
        (s || n) && a.appendTransform(0, 0, 1, 1, 0, 0, 0, -s, -n),
        e && a.prependMatrix(e);
        var h = r * a.a
            , l = r * a.b
            , c = o * a.c
            , u = o * a.d
            , p = a.tx
            , d = a.ty
            , f = p
            , v = p
            , g = d
            , m = d;
        return (s = h + p) < f ? f = s : s > v && (v = s),
        (s = h + c + p) < f ? f = s : s > v && (v = s),
        (s = c + p) < f ? f = s : s > v && (v = s),
        (n = l + d) < g ? g = n : n > m && (m = n),
        (n = l + u + d) < g ? g = n : n > m && (m = n),
        (n = u + d) < g ? g = n : n > m && (m = n),
        t.setValues(f, g, v - f, m - g)
    }
    ,
    e._hasMouseEventListener = function() {
        for (var e = t._MOUSE_EVENTS, i = 0, s = e.length; s > i; i++)
            if (this.hasEventListener(e[i]))
                return !0;
        return !!this.cursor
    }
    ,
    createjs.DisplayObject = createjs.promote(t, "EventDispatcher")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        this.DisplayObject_constructor(),
        this.children = [],
        this.mouseChildren = !0,
        this.tickChildren = !0
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    e.getNumChildren = function() {
        return this.children.length
    }
    ;
    try {
        Object.defineProperties(e, {
            numChildren: {
                get: e.getNumChildren
            }
        })
    } catch (i) {}
    e.initialize = t,
    e.isVisible = function() {
        var t = this.cacheCanvas || this.children.length;
        return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
    }
    ,
    e.draw = function(t, e) {
        if (this.DisplayObject_draw(t, e))
            return !0;
        for (var i = this.children.slice(), s = 0, n = i.length; n > s; s++) {
            var r = i[s];
            r.isVisible() && (t.save(),
            r.updateContext(t),
            r.draw(t),
            t.restore())
        }
        return !0
    }
    ,
    e.addChild = function(t) {
        if (null == t)
            return t;
        var e = arguments.length;
        if (e > 1) {
            for (var i = 0; e > i; i++)
                this.addChild(arguments[i]);
            return arguments[e - 1]
        }
        return t.parent && t.parent.removeChild(t),
        t.parent = this,
        this.children.push(t),
        t.dispatchEvent("added"),
        t
    }
    ,
    e.addChildAt = function(t, e) {
        var i = arguments.length
            , s = arguments[i - 1];
        if (0 > s || s > this.children.length)
            return arguments[i - 2];
        if (i > 2) {
            for (var n = 0; i - 1 > n; n++)
                this.addChildAt(arguments[n], s + n);
            return arguments[i - 2]
        }
        return t.parent && t.parent.removeChild(t),
        t.parent = this,
        this.children.splice(e, 0, t),
        t.dispatchEvent("added"),
        t
    }
    ,
    e.removeChild = function(t) {
        var e = arguments.length;
        if (e > 1) {
            for (var i = !0, s = 0; e > s; s++)
                i = i && this.removeChild(arguments[s]);
            return i
        }
        return this.removeChildAt(createjs.indexOf(this.children, t))
    }
    ,
    e.removeChildAt = function(t) {
        var e = arguments.length;
        if (e > 1) {
            for (var i = [], s = 0; e > s; s++)
                i[s] = arguments[s];
            i.sort(function(t, e) {
                return e - t
            });
            for (var n = !0, s = 0; e > s; s++)
                n = n && this.removeChildAt(i[s]);
            return n
        }
        if (0 > t || t > this.children.length - 1)
            return !1;
        var r = this.children[t];
        return r && (r.parent = null),
        this.children.splice(t, 1),
        r.dispatchEvent("removed"),
        !0
    }
    ,
    e.removeAllChildren = function() {
        for (var t = this.children; t.length; )
            this.removeChildAt(0)
    }
    ,
    e.getChildAt = function(t) {
        return this.children[t]
    }
    ,
    e.getChildByName = function(t) {
        for (var e = this.children, i = 0, s = e.length; s > i; i++)
            if (e[i].name == t)
                return e[i];
        return null
    }
    ,
    e.sortChildren = function(t) {
        this.children.sort(t)
    }
    ,
    e.getChildIndex = function(t) {
        return createjs.indexOf(this.children, t)
    }
    ,
    e.swapChildrenAt = function(t, e) {
        var i = this.children
            , s = i[t]
            , n = i[e];
        s && n && (i[t] = n,
        i[e] = s)
    }
    ,
    e.swapChildren = function(t, e) {
        for (var i, s, n = this.children, r = 0, o = n.length; o > r && (n[r] == t && (i = r),
        n[r] == e && (s = r),
        null == i || null == s); r++)
            ;
        r != o && (n[i] = e,
        n[s] = t)
    }
    ,
    e.setChildIndex = function(t, e) {
        var i = this.children
            , s = i.length;
        if (!(t.parent != this || 0 > e || e >= s)) {
            for (var n = 0; s > n && i[n] != t; n++)
                ;
            n != s && n != e && (i.splice(n, 1),
            i.splice(e, 0, t))
        }
    }
    ,
    e.contains = function(t) {
        for (; t; ) {
            if (t == this)
                return !0;
            t = t.parent
        }
        return !1
    }
    ,
    e.hitTest = function(t, e) {
        return null != this.getObjectUnderPoint(t, e)
    }
    ,
    e.getObjectsUnderPoint = function(t, e, i) {
        var s = []
            , n = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(n.x, n.y, s, i > 0, 1 == i),
        s
    }
    ,
    e.getObjectUnderPoint = function(t, e, i) {
        var s = this.localToGlobal(t, e);
        return this._getObjectsUnderPoint(s.x, s.y, null, i > 0, 1 == i)
    }
    ,
    e.getBounds = function() {
        return this._getBounds(null, !0)
    }
    ,
    e.getTransformedBounds = function() {
        return this._getBounds()
    }
    ,
    e.clone = function(e) {
        var i = this._cloneProps(new t);
        return e && this._cloneChildren(i),
        i
    }
    ,
    e.toString = function() {
        return "[Container (name=" + this.name + ")]"
    }
    ,
    e._tick = function(t) {
        if (this.tickChildren)
            for (var e = this.children.length - 1; e >= 0; e--) {
                var i = this.children[e];
                i.tickEnabled && i._tick && i._tick(t)
            }
        this.DisplayObject__tick(t)
    }
    ,
    e._cloneChildren = function(t) {
        t.children.length && t.removeAllChildren();
        for (var e = t.children, i = 0, s = this.children.length; s > i; i++) {
            var n = this.children[i].clone(!0);
            n.parent = t,
            e.push(n)
        }
    }
    ,
    e._getObjectsUnderPoint = function(e, i, s, n, r, o) {
        if (o = o || 0,
        !o && !this._testMask(this, e, i))
            return null;
        var a, h = createjs.DisplayObject._hitTestContext;
        r = r || n && this._hasMouseEventListener();
        for (var l = this.children, c = l.length, u = c - 1; u >= 0; u--) {
            var p = l[u]
                , d = p.hitArea;
            if (p.visible && (d || p.isVisible()) && (!n || p.mouseEnabled) && (d || this._testMask(p, e, i)))
                if (!d && p instanceof t) {
                    var f = p._getObjectsUnderPoint(e, i, s, n, r, o + 1);
                    if (!s && f)
                        return n && !this.mouseChildren ? this : f
                } else {
                    if (n && !r && !p._hasMouseEventListener())
                        continue;
                    var v = p.getConcatenatedDisplayProps(p._props);
                    if (a = v.matrix,
                    d && (a.appendMatrix(d.getMatrix(d._props.matrix)),
                    v.alpha = d.alpha),
                    h.globalAlpha = v.alpha,
                    h.setTransform(a.a, a.b, a.c, a.d, a.tx - e, a.ty - i),
                    (d || p).draw(h),
                    !this._testHit(h))
                        continue;
                    if (h.setTransform(1, 0, 0, 1, 0, 0),
                    h.clearRect(0, 0, 2, 2),
                    !s)
                        return n && !this.mouseChildren ? this : p;
                    s.push(p)
                }
        }
        return null
    }
    ,
    e._testMask = function(t, e, i) {
        var s = t.mask;
        if (!s || !s.graphics || s.graphics.isEmpty())
            return !0;
        var n = this._props.matrix
            , r = t.parent;
        n = r ? r.getConcatenatedMatrix(n) : n.identity(),
        n = s.getMatrix(s._props.matrix).prependMatrix(n);
        var o = createjs.DisplayObject._hitTestContext;
        return o.setTransform(n.a, n.b, n.c, n.d, n.tx - e, n.ty - i),
        s.graphics.drawAsPath(o),
        o.fillStyle = "#000",
        o.fill(),
        this._testHit(o) ? (o.setTransform(1, 0, 0, 1, 0, 0),
        o.clearRect(0, 0, 2, 2),
        !0) : !1
    }
    ,
    e._getBounds = function(t, e) {
        var i = this.DisplayObject_getBounds();
        if (i)
            return this._transformBounds(i, t, e);
        var s = this._props.matrix;
        s = e ? s.identity() : this.getMatrix(s),
        t && s.prependMatrix(t);
        for (var n = this.children.length, r = null, o = 0; n > o; o++) {
            var a = this.children[o];
            a.visible && (i = a._getBounds(s)) && (r ? r.extend(i.x, i.y, i.width, i.height) : r = i.clone())
        }
        return r
    }
    ,
    createjs.Container = createjs.promote(t, "DisplayObject")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t) {
        this.Container_constructor(),
        this.autoClear = !0,
        this.canvas = "string" == typeof t ? document.getElementById(t) : t,
        this.mouseX = 0,
        this.mouseY = 0,
        this.drawRect = null,
        this.snapToPixelEnabled = !1,
        this.mouseInBounds = !1,
        this.tickOnUpdate = !0,
        this.mouseMoveOutside = !1,
        this.preventSelection = !0,
        this._pointerData = {},
        this._pointerCount = 0,
        this._primaryPointerID = null,
        this._mouseOverIntervalID = null,
        this._nextStage = null,
        this._prevStage = null,
        this.enableDOMEvents(!0)
    }
    var e = createjs.extend(t, createjs.Container);
    e._get_nextStage = function() {
        return this._nextStage
    }
    ,
    e._set_nextStage = function(t) {
        this._nextStage && (this._nextStage._prevStage = null),
        t && (t._prevStage = this),
        this._nextStage = t
    }
    ;
    try {
        Object.defineProperties(e, {
            nextStage: {
                get: e._get_nextStage,
                set: e._set_nextStage
            }
        })
    } catch (i) {}
    e.update = function(t) {
        if (this.canvas && (this.tickOnUpdate && this.tick(t),
        !this.dispatchEvent("drawstart"))) {
            createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled;
            var e = this.drawRect
                , i = this.canvas.getContext("2d");
            i.setTransform(1, 0, 0, 1, 0, 0),
            this.autoClear && (e ? i.clearRect(e.x, e.y, e.width, e.height) : i.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)),
            i.save(),
            this.drawRect && (i.beginPath(),
            i.rect(e.x, e.y, e.width, e.height),
            i.clip()),
            this.updateContext(i),
            this.draw(i, !1),
            i.restore(),
            this.dispatchEvent("drawend")
        }
    }
    ,
    e.tick = function(t) {
        if (this.tickEnabled && !this.dispatchEvent("tickstart")) {
            var e = new createjs.Event("tick");
            if (t)
                for (var i in t)
                    t.hasOwnProperty(i) && (e[i] = t[i]);
            this._tick(e),
            this.dispatchEvent("tickend")
        }
    }
    ,
    e.handleEvent = function(t) {
        "tick" == t.type && this.update(t)
    }
    ,
    e.clear = function() {
        if (this.canvas) {
            var t = this.canvas.getContext("2d");
            t.setTransform(1, 0, 0, 1, 0, 0),
            t.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
        }
    }
    ,
    e.toDataURL = function(t, e) {
        var i, s = this.canvas.getContext("2d"), n = this.canvas.width, r = this.canvas.height;
        if (t) {
            i = s.getImageData(0, 0, n, r);
            var o = s.globalCompositeOperation;
            s.globalCompositeOperation = "destination-over",
            s.fillStyle = t,
            s.fillRect(0, 0, n, r)
        }
        var a = this.canvas.toDataURL(e || "image/png");
        return t && (s.putImageData(i, 0, 0),
        s.globalCompositeOperation = o),
        a
    }
    ,
    e.enableMouseOver = function(t) {
        if (this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID),
        this._mouseOverIntervalID = null,
        0 == t && this._testMouseOver(!0)),
        null == t)
            t = 20;
        else if (0 >= t)
            return;
        var e = this;
        this._mouseOverIntervalID = setInterval(function() {
            e._testMouseOver()
        }, 1e3 / Math.min(50, t))
    }
    ,
    e.enableDOMEvents = function(t) {
        null == t && (t = !0);
        var e, i, s = this._eventListeners;
        if (!t && s) {
            for (e in s)
                i = s[e],
                i.t.removeEventListener(e, i.f, !1);
            this._eventListeners = null
        } else if (t && !s && this.canvas) {
            var n = window.addEventListener ? window : document
                , r = this;
            s = this._eventListeners = {},
            s.mouseup = {
                t: n,
                f: function(t) {
                    r._handleMouseUp(t)
                }
            },
            s.mousemove = {
                t: n,
                f: function(t) {
                    r._handleMouseMove(t)
                }
            },
            s.dblclick = {
                t: this.canvas,
                f: function(t) {
                    r._handleDoubleClick(t)
                }
            },
            s.mousedown = {
                t: this.canvas,
                f: function(t) {
                    r._handleMouseDown(t)
                }
            };
            for (e in s)
                i = s[e],
                i.t.addEventListener(e, i.f, !1)
        }
    }
    ,
    e.clone = function() {
        throw "Stage cannot be cloned."
    }
    ,
    e.toString = function() {
        return "[Stage (name=" + this.name + ")]"
    }
    ,
    e._getElementRect = function(t) {
        var e;
        try {
            e = t.getBoundingClientRect()
        } catch (i) {
            e = {
                top: t.offsetTop,
                left: t.offsetLeft,
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        }
        var s = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0)
            , n = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0)
            , r = window.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle
            , o = parseInt(r.paddingLeft) + parseInt(r.borderLeftWidth)
            , a = parseInt(r.paddingTop) + parseInt(r.borderTopWidth)
            , h = parseInt(r.paddingRight) + parseInt(r.borderRightWidth)
            , l = parseInt(r.paddingBottom) + parseInt(r.borderBottomWidth);
        return {
            left: e.left + s + o,
            right: e.right + s - h,
            top: e.top + n + a,
            bottom: e.bottom + n - l
        }
    }
    ,
    e._getPointerData = function(t) {
        var e = this._pointerData[t];
        return e || (e = this._pointerData[t] = {
            x: 0,
            y: 0
        }),
        e
    }
    ,
    e._handleMouseMove = function(t) {
        t || (t = window.event),
        this._handlePointerMove(-1, t, t.pageX, t.pageY)
    }
    ,
    e._handlePointerMove = function(t, e, i, s, n) {
        if ((!this._prevStage || void 0 !== n) && this.canvas) {
            var r = this._nextStage
                , o = this._getPointerData(t)
                , a = o.inBounds;
            this._updatePointerPosition(t, e, i, s),
            (a || o.inBounds || this.mouseMoveOutside) && (-1 === t && o.inBounds == !a && this._dispatchMouseEvent(this, a ? "mouseleave" : "mouseenter", !1, t, o, e),
            this._dispatchMouseEvent(this, "stagemousemove", !1, t, o, e),
            this._dispatchMouseEvent(o.target, "pressmove", !0, t, o, e)),
            r && r._handlePointerMove(t, e, i, s, null)
        }
    }
    ,
    e._updatePointerPosition = function(t, e, i, s) {
        var n = this._getElementRect(this.canvas);
        i -= n.left,
        s -= n.top;
        var r = this.canvas.width
            , o = this.canvas.height;
        i /= (n.right - n.left) / r,
        s /= (n.bottom - n.top) / o;
        var a = this._getPointerData(t);
        (a.inBounds = i >= 0 && s >= 0 && r - 1 >= i && o - 1 >= s) ? (a.x = i,
        a.y = s) : this.mouseMoveOutside && (a.x = 0 > i ? 0 : i > r - 1 ? r - 1 : i,
        a.y = 0 > s ? 0 : s > o - 1 ? o - 1 : s),
        a.posEvtObj = e,
        a.rawX = i,
        a.rawY = s,
        (t === this._primaryPointerID || -1 === t) && (this.mouseX = a.x,
        this.mouseY = a.y,
        this.mouseInBounds = a.inBounds)
    }
    ,
    e._handleMouseUp = function(t) {
        this._handlePointerUp(-1, t, !1)
    }
    ,
    e._handlePointerUp = function(t, e, i, s) {
        var n = this._nextStage
            , r = this._getPointerData(t);
        if (!this._prevStage || void 0 !== s) {
            r.down && this._dispatchMouseEvent(this, "stagemouseup", !1, t, r, e),
            r.down = !1;
            var o = null
                , a = r.target;
            s || !a && !n || (o = this._getObjectsUnderPoint(r.x, r.y, null, !0)),
            o == a && this._dispatchMouseEvent(a, "click", !0, t, r, e),
            this._dispatchMouseEvent(a, "pressup", !0, t, r, e),
            i ? (t == this._primaryPointerID && (this._primaryPointerID = null),
            delete this._pointerData[t]) : r.target = null,
            n && n._handlePointerUp(t, e, i, s || o && this)
        }
    }
    ,
    e._handleMouseDown = function(t) {
        this._handlePointerDown(-1, t, t.pageX, t.pageY)
    }
    ,
    e._handlePointerDown = function(t, e, i, s, n) {
        this.preventSelection && e.preventDefault(),
        (null == this._primaryPointerID || -1 === t) && (this._primaryPointerID = t),
        null != s && this._updatePointerPosition(t, e, i, s);
        var r = null
            , o = this._nextStage
            , a = this._getPointerData(t);
        a.inBounds && (this._dispatchMouseEvent(this, "stagemousedown", !1, t, a, e),
        a.down = !0),
        n || (r = a.target = this._getObjectsUnderPoint(a.x, a.y, null, !0),
        this._dispatchMouseEvent(a.target, "mousedown", !0, t, a, e)),
        o && o._handlePointerDown(t, e, i, s, n || r && this)
    }
    ,
    e._testMouseOver = function(t, e, i) {
        if (!this._prevStage || void 0 !== e) {
            var s = this._nextStage;
            if (!this._mouseOverIntervalID)
                return void (s && s._testMouseOver(t, e, i));
            var n = this._getPointerData(-1);
            if (n && (t || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
                var r, o, a, h = n.posEvtObj, l = i || h && h.target == this.canvas, c = null, u = -1, p = "";
                !e && (t || this.mouseInBounds && l) && (c = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0),
                this._mouseOverX = this.mouseX,
                this._mouseOverY = this.mouseY);
                var d = this._mouseOverTarget || []
                    , f = d[d.length - 1]
                    , v = this._mouseOverTarget = [];
                for (r = c; r; )
                    v.unshift(r),
                    null != r.cursor && (p = r.cursor),
                    r = r.parent;
                for (this.canvas.style.cursor = p,
                !e && i && (i.canvas.style.cursor = p),
                o = 0,
                a = v.length; a > o && v[o] == d[o]; o++)
                    u = o;
                for (f != c && this._dispatchMouseEvent(f, "mouseout", !0, -1, n, h),
                o = d.length - 1; o > u; o--)
                    this._dispatchMouseEvent(d[o], "rollout", !1, -1, n, h);
                for (o = v.length - 1; o > u; o--)
                    this._dispatchMouseEvent(v[o], "rollover", !1, -1, n, h);
                f != c && this._dispatchMouseEvent(c, "mouseover", !0, -1, n, h),
                s && s._testMouseOver(t, e || c && this, i || l && this)
            }
        }
    }
    ,
    e._handleDoubleClick = function(t, e) {
        var i = null
            , s = this._nextStage
            , n = this._getPointerData(-1);
        e || (i = this._getObjectsUnderPoint(n.x, n.y, null, !0),
        this._dispatchMouseEvent(i, "dblclick", !0, -1, n, t)),
        s && s._handleDoubleClick(t, e || i && this)
    }
    ,
    e._dispatchMouseEvent = function(t, e, i, s, n, r) {
        if (t && (i || t.hasEventListener(e))) {
            var o = new createjs.MouseEvent(e,i,!1,n.x,n.y,r,s,s === this._primaryPointerID || -1 === s,n.rawX,n.rawY);
            t.dispatchEvent(o)
        }
    }
    ,
    createjs.Stage = createjs.promote(t, "Container")
}(),
self.createjs = self.createjs || {},
function() {
    function t(t) {
        this.DisplayObject_constructor(),
        "string" == typeof t ? (this.image = document.createElement("img"),
        this.image.src = t) : this.image = t,
        this.sourceRect = null
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    e.initialize = t,
    e.isVisible = function() {
        var t = this.cacheCanvas || this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2);
        return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
    }
    ,
    e.draw = function(t, e) {
        if (this.DisplayObject_draw(t, e) || !this.image)
            return !0;
        var i = this.image
            , s = this.sourceRect;
        if (s) {
            var n = s.x
                , r = s.y
                , o = n + s.width
                , a = r + s.height
                , h = 0
                , l = 0
                , c = i.width
                , u = i.height;
            0 > n && (h -= n,
            n = 0),
            o > c && (o = c),
            0 > r && (l -= r,
            r = 0),
            a > u && (a = u),
            t.drawImage(i, n, r, o - n, a - r, h, l, o - n, a - r)
        } else
            t.drawImage(i, 0, 0);
        return !0
    }
    ,
    e.getBounds = function() {
        var t = this.DisplayObject_getBounds();
        if (t)
            return t;
        var e = this.sourceRect || this.image
            , i = this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2);
        return i ? this._rectangle.setValues(0, 0, e.width, e.height) : null
    }
    ,
    e.clone = function() {
        var e = new t(this.image);
        return this.sourceRect && (e.sourceRect = this.sourceRect.clone()),
        this._cloneProps(e),
        e
    }
    ,
    e.toString = function() {
        return "[Bitmap (name=" + this.name + ")]"
    }
    ,
    createjs.Bitmap = createjs.promote(t, "DisplayObject")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e) {
        this.DisplayObject_constructor(),
        this.currentFrame = 0,
        this.currentAnimation = null,
        this.paused = !0,
        this.spriteSheet = t,
        this.currentAnimationFrame = 0,
        this.framerate = 0,
        this._animation = null,
        this._currentFrame = null,
        this._skipAdvance = !1,
        e && this.gotoAndPlay(e)
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    e.isVisible = function() {
        var t = this.cacheCanvas || this.spriteSheet.complete;
        return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
    }
    ,
    e.draw = function(t, e) {
        if (this.DisplayObject_draw(t, e))
            return !0;
        this._normalizeFrame();
        var i = this.spriteSheet.getFrame(0 | this._currentFrame);
        if (!i)
            return !1;
        var s = i.rect;
        return s.width && s.height && t.drawImage(i.image, s.x, s.y, s.width, s.height, -i.regX, -i.regY, s.width, s.height),
        !0
    }
    ,
    e.play = function() {
        this.paused = !1
    }
    ,
    e.stop = function() {
        this.paused = !0
    }
    ,
    e.gotoAndPlay = function(t) {
        this.paused = !1,
        this._skipAdvance = !0,
        this._goto(t)
    }
    ,
    e.gotoAndStop = function(t) {
        this.paused = !0,
        this._goto(t)
    }
    ,
    e.advance = function(t) {
        var e = this.framerate || this.spriteSheet.framerate
            , i = e && null != t ? t / (1e3 / e) : 1;
        this._normalizeFrame(i)
    }
    ,
    e.getBounds = function() {
        return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
    }
    ,
    e.clone = function() {
        return this._cloneProps(new t(this.spriteSheet))
    }
    ,
    e.toString = function() {
        return "[Sprite (name=" + this.name + ")]"
    }
    ,
    e._cloneProps = function(t) {
        return this.DisplayObject__cloneProps(t),
        t.currentFrame = this.currentFrame,
        t.currentAnimation = this.currentAnimation,
        t.paused = this.paused,
        t.currentAnimationFrame = this.currentAnimationFrame,
        t.framerate = this.framerate,
        t._animation = this._animation,
        t._currentFrame = this._currentFrame,
        t._skipAdvance = this._skipAdvance,
        t
    }
    ,
    e._tick = function(t) {
        this.paused || (this._skipAdvance || this.advance(t && t.delta),
        this._skipAdvance = !1),
        this.DisplayObject__tick(t)
    }
    ,
    e._normalizeFrame = function(t) {
        t = t || 0;
        var e, i = this._animation, s = this.paused, n = this._currentFrame;
        if (i) {
            var r = i.speed || 1
                , o = this.currentAnimationFrame;
            if (e = i.frames.length,
            o + t * r >= e) {
                var a = i.next;
                if (this._dispatchAnimationEnd(i, n, s, a, e - 1))
                    return;
                if (a)
                    return this._goto(a, t - (e - o) / r);
                this.paused = !0,
                o = i.frames.length - 1
            } else
                o += t * r;
            this.currentAnimationFrame = o,
            this._currentFrame = i.frames[0 | o]
        } else if (n = this._currentFrame += t,
        e = this.spriteSheet.getNumFrames(),
        n >= e && e > 0 && !this._dispatchAnimationEnd(i, n, s, e - 1) && (this._currentFrame -= e) >= e)
            return this._normalizeFrame();
        n = 0 | this._currentFrame,
        this.currentFrame != n && (this.currentFrame = n,
        this.dispatchEvent("change"))
    }
    ,
    e._dispatchAnimationEnd = function(t, e, i, s, n) {
        var r = t ? t.name : null;
        if (this.hasEventListener("animationend")) {
            var o = new createjs.Event("animationend");
            o.name = r,
            o.next = s,
            this.dispatchEvent(o)
        }
        var a = this._animation != t || this._currentFrame != e;
        return a || i || !this.paused || (this.currentAnimationFrame = n,
        a = !0),
        a
    }
    ,
    e._goto = function(t, e) {
        if (this.currentAnimationFrame = 0,
        isNaN(t)) {
            var i = this.spriteSheet.getAnimation(t);
            i && (this._animation = i,
            this.currentAnimation = t,
            this._normalizeFrame(e))
        } else
            this.currentAnimation = this._animation = null,
            this._currentFrame = t,
            this._normalizeFrame()
    }
    ,
    createjs.Sprite = createjs.promote(t, "DisplayObject")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t) {
        this.DisplayObject_constructor(),
        this.graphics = t ? t : new createjs.Graphics
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    e.isVisible = function() {
        var t = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
        return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
    }
    ,
    e.draw = function(t, e) {
        return this.DisplayObject_draw(t, e) ? !0 : (this.graphics.draw(t, this),
        !0)
    }
    ,
    e.clone = function(e) {
        var i = e && this.graphics ? this.graphics.clone() : this.graphics;
        return this._cloneProps(new t(i))
    }
    ,
    e.toString = function() {
        return "[Shape (name=" + this.name + ")]"
    }
    ,
    createjs.Shape = createjs.promote(t, "DisplayObject")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i) {
        this.DisplayObject_constructor(),
        this.text = t,
        this.font = e,
        this.color = i,
        this.textAlign = "left",
        this.textBaseline = "top",
        this.maxWidth = null,
        this.outline = 0,
        this.lineHeight = 0,
        this.lineWidth = null
    }
    var e = createjs.extend(t, createjs.DisplayObject)
        , i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    i.getContext && (t._workingContext = i.getContext("2d"),
    i.width = i.height = 1),
    t.H_OFFSETS = {
        start: 0,
        left: 0,
        center: -.5,
        end: -1,
        right: -1
    },
    t.V_OFFSETS = {
        top: 0,
        hanging: -.01,
        middle: -.4,
        alphabetic: -.8,
        ideographic: -.85,
        bottom: -1
    },
    e.isVisible = function() {
        var t = this.cacheCanvas || null != this.text && "" !== this.text;
        return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && t)
    }
    ,
    e.draw = function(t, e) {
        if (this.DisplayObject_draw(t, e))
            return !0;
        var i = this.color || "#000";
        return this.outline ? (t.strokeStyle = i,
        t.lineWidth = 1 * this.outline) : t.fillStyle = i,
        this._drawText(this._prepContext(t)),
        !0
    }
    ,
    e.getMeasuredWidth = function() {
        return this._getMeasuredWidth(this.text)
    }
    ,
    e.getMeasuredLineHeight = function() {
        return 1.2 * this._getMeasuredWidth("M")
    }
    ,
    e.getMeasuredHeight = function() {
        return this._drawText(null, {}).height
    }
    ,
    e.getBounds = function() {
        var e = this.DisplayObject_getBounds();
        if (e)
            return e;
        if (null == this.text || "" == this.text)
            return null;
        var i = this._drawText(null, {})
            , s = this.maxWidth && this.maxWidth < i.width ? this.maxWidth : i.width
            , n = s * t.H_OFFSETS[this.textAlign || "left"]
            , r = this.lineHeight || this.getMeasuredLineHeight()
            , o = r * t.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.setValues(n, o, s, i.height)
    }
    ,
    e.getMetrics = function() {
        var e = {
            lines: []
        };
        return e.lineHeight = this.lineHeight || this.getMeasuredLineHeight(),
        e.vOffset = e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"],
        this._drawText(null, e, e.lines)
    }
    ,
    e.clone = function() {
        return this._cloneProps(new t(this.text,this.font,this.color))
    }
    ,
    e.toString = function() {
        return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]"
    }
    ,
    e._cloneProps = function(t) {
        return this.DisplayObject__cloneProps(t),
        t.textAlign = this.textAlign,
        t.textBaseline = this.textBaseline,
        t.maxWidth = this.maxWidth,
        t.outline = this.outline,
        t.lineHeight = this.lineHeight,
        t.lineWidth = this.lineWidth,
        t
    }
    ,
    e._prepContext = function(t) {
        return t.font = this.font || "10px sans-serif",
        t.textAlign = this.textAlign || "left",
        t.textBaseline = this.textBaseline || "top",
        t
    }
    ,
    e._drawText = function(e, i, s) {
        var n = !!e;
        n || (e = t._workingContext,
        e.save(),
        this._prepContext(e));
        for (var r = this.lineHeight || this.getMeasuredLineHeight(), o = 0, a = 0, h = String(this.text).split(/(?:\r\n|\r|\n)/), l = 0, c = h.length; c > l; l++) {
            var u = h[l]
                , p = null;
            if (null != this.lineWidth && (p = e.measureText(u).width) > this.lineWidth) {
                var d = u.split(/(\s)/);
                u = d[0],
                p = e.measureText(u).width;
                for (var f = 1, v = d.length; v > f; f += 2) {
                    var g = e.measureText(d[f] + d[f + 1]).width;
                    p + g > this.lineWidth ? (n && this._drawTextLine(e, u, a * r),
                    s && s.push(u),
                    p > o && (o = p),
                    u = d[f + 1],
                    p = e.measureText(u).width,
                    a++) : (u += d[f] + d[f + 1],
                    p += g)
                }
            }
            n && this._drawTextLine(e, u, a * r),
            s && s.push(u),
            i && null == p && (p = e.measureText(u).width),
            p > o && (o = p),
            a++
        }
        return i && (i.width = o,
        i.height = a * r),
        n || e.restore(),
        i
    }
    ,
    e._drawTextLine = function(t, e, i) {
        this.outline ? t.strokeText(e, 0, i, this.maxWidth || 65535) : t.fillText(e, 0, i, this.maxWidth || 65535)
    }
    ,
    e._getMeasuredWidth = function(e) {
        var i = t._workingContext;
        i.save();
        var s = this._prepContext(i).measureText(e).width;
        return i.restore(),
        s
    }
    ,
    createjs.Text = createjs.promote(t, "DisplayObject")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e) {
        this.Container_constructor(),
        this.text = t || "",
        this.spriteSheet = e,
        this.lineHeight = 0,
        this.letterSpacing = 0,
        this.spaceWidth = 0,
        this._oldProps = {
            text: 0,
            spriteSheet: 0,
            lineHeight: 0,
            letterSpacing: 0,
            spaceWidth: 0
        }
    }
    var e = createjs.extend(t, createjs.Container);
    t.maxPoolSize = 100,
    t._spritePool = [],
    e.draw = function(t, e) {
        this.DisplayObject_draw(t, e) || (this._updateText(),
        this.Container_draw(t, e))
    }
    ,
    e.getBounds = function() {
        return this._updateText(),
        this.Container_getBounds()
    }
    ,
    e.isVisible = function() {
        var t = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text;
        return !!(this.visible && this.alpha > 0 && 0 !== this.scaleX && 0 !== this.scaleY && t)
    }
    ,
    e.clone = function() {
        return this._cloneProps(new t(this.text,this.spriteSheet))
    }
    ,
    e.addChild = e.addChildAt = e.removeChild = e.removeChildAt = e.removeAllChildren = function() {}
    ,
    e._cloneProps = function(t) {
        return this.DisplayObject__cloneProps(t),
        t.lineHeight = this.lineHeight,
        t.letterSpacing = this.letterSpacing,
        t.spaceWidth = this.spaceWidth,
        t
    }
    ,
    e._getFrameIndex = function(t, e) {
        var i, s = e.getAnimation(t);
        return s || (t != (i = t.toUpperCase()) || t != (i = t.toLowerCase()) || (i = null),
        i && (s = e.getAnimation(i))),
        s && s.frames[0]
    }
    ,
    e._getFrame = function(t, e) {
        var i = this._getFrameIndex(t, e);
        return null == i ? i : e.getFrame(i)
    }
    ,
    e._getLineHeight = function(t) {
        var e = this._getFrame("1", t) || this._getFrame("T", t) || this._getFrame("L", t) || t.getFrame(0);
        return e ? e.rect.height : 1
    }
    ,
    e._getSpaceWidth = function(t) {
        var e = this._getFrame("1", t) || this._getFrame("l", t) || this._getFrame("e", t) || this._getFrame("a", t) || t.getFrame(0);
        return e ? e.rect.width : 1
    }
    ,
    e._updateText = function() {
        var e, i = 0, s = 0, n = this._oldProps, r = !1, o = this.spaceWidth, a = this.lineHeight, h = this.spriteSheet, l = t._spritePool, c = this.children, u = 0, p = c.length;
        for (var d in n)
            n[d] != this[d] && (n[d] = this[d],
            r = !0);
        if (r) {
            var f = !!this._getFrame(" ", h);
            f || o || (o = this._getSpaceWidth(h)),
            a || (a = this._getLineHeight(h));
            for (var v = 0, g = this.text.length; g > v; v++) {
                var m = this.text.charAt(v);
                if (" " != m || f)
                    if ("\n" != m && "\r" != m) {
                        var y = this._getFrameIndex(m, h);
                        null != y && (p > u ? e = c[u] : (c.push(e = l.length ? l.pop() : new createjs.Sprite),
                        e.parent = this,
                        p++),
                        e.spriteSheet = h,
                        e.gotoAndStop(y),
                        e.x = i,
                        e.y = s,
                        u++,
                        i += e.getBounds().width + this.letterSpacing)
                    } else
                        "\r" == m && "\n" == this.text.charAt(v + 1) && v++,
                        i = 0,
                        s += a;
                else
                    i += o
            }
            for (; p > u; )
                l.push(e = c.pop()),
                e.parent = null,
                p--;
            l.length > t.maxPoolSize && (l.length = t.maxPoolSize)
        }
    }
    ,
    createjs.BitmapText = createjs.promote(t, "Container")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        throw "SpriteSheetUtils cannot be instantiated"
    }
    var e = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    e.getContext && (t._workingCanvas = e,
    t._workingContext = e.getContext("2d"),
    e.width = e.height = 1),
    t.addFlippedFrames = function(e, i, s, n) {
        if (i || s || n) {
            var r = 0;
            i && t._flip(e, ++r, !0, !1),
            s && t._flip(e, ++r, !1, !0),
            n && t._flip(e, ++r, !0, !0)
        }
    }
    ,
    t.extractFrame = function(e, i) {
        isNaN(i) && (i = e.getAnimation(i).frames[0]);
        var s = e.getFrame(i);
        if (!s)
            return null;
        var n = s.rect
            , r = t._workingCanvas;
        r.width = n.width,
        r.height = n.height,
        t._workingContext.drawImage(s.image, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height);
        var o = document.createElement("img");
        return o.src = r.toDataURL("image/png"),
        o
    }
    ,
    t.mergeAlpha = function(t, e, i) {
        i || (i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")),
        i.width = Math.max(e.width, t.width),
        i.height = Math.max(e.height, t.height);
        var s = i.getContext("2d");
        return s.save(),
        s.drawImage(t, 0, 0),
        s.globalCompositeOperation = "destination-in",
        s.drawImage(e, 0, 0),
        s.restore(),
        i
    }
    ,
    t._flip = function(e, i, s, n) {
        for (var r = e._images, o = t._workingCanvas, a = t._workingContext, h = r.length / i, l = 0; h > l; l++) {
            var c = r[l];
            c.__tmp = l,
            a.setTransform(1, 0, 0, 1, 0, 0),
            a.clearRect(0, 0, o.width + 1, o.height + 1),
            o.width = c.width,
            o.height = c.height,
            a.setTransform(s ? -1 : 1, 0, 0, n ? -1 : 1, s ? c.width : 0, n ? c.height : 0),
            a.drawImage(c, 0, 0);
            var u = document.createElement("img");
            u.src = o.toDataURL("image/png"),
            u.width = c.width,
            u.height = c.height,
            r.push(u)
        }
        var p = e._frames
            , d = p.length / i;
        for (l = 0; d > l; l++) {
            c = p[l];
            var f = c.rect.clone();
            u = r[c.image.__tmp + h * i];
            var v = {
                image: u,
                rect: f,
                regX: c.regX,
                regY: c.regY
            };
            s && (f.x = u.width - f.x - f.width,
            v.regX = f.width - c.regX),
            n && (f.y = u.height - f.y - f.height,
            v.regY = f.height - c.regY),
            p.push(v)
        }
        var g = "_" + (s ? "h" : "") + (n ? "v" : "")
            , m = e._animations
            , y = e._data
            , w = m.length / i;
        for (l = 0; w > l; l++) {
            var x = m[l];
            c = y[x];
            var _ = {
                name: x + g,
                speed: c.speed,
                next: c.next,
                frames: []
            };
            c.next && (_.next += g),
            p = c.frames;
            for (var b = 0, T = p.length; T > b; b++)
                _.frames.push(p[b] + d * i);
            y[_.name] = _,
            m.push(_.name)
        }
    }
    ,
    createjs.SpriteSheetUtils = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        this.EventDispatcher_constructor(),
        this.maxWidth = 2048,
        this.maxHeight = 2048,
        this.spriteSheet = null,
        this.scale = 1,
        this.padding = 1,
        this.timeSlice = .3,
        this.progress = -1,
        this._frames = [],
        this._animations = {},
        this._data = null,
        this._nextFrameIndex = 0,
        this._index = 0,
        this._timerID = null,
        this._scale = 1
    }
    var e = createjs.extend(t, createjs.EventDispatcher);
    t.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions",
    t.ERR_RUNNING = "a build is already running",
    e.addFrame = function(e, i, s, n, r) {
        if (this._data)
            throw t.ERR_RUNNING;
        var o = i || e.bounds || e.nominalBounds;
        return !o && e.getBounds && (o = e.getBounds()),
        o ? (s = s || 1,
        this._frames.push({
            source: e,
            sourceRect: o,
            scale: s,
            funct: n,
            data: r,
            index: this._frames.length,
            height: o.height * s
        }) - 1) : null
    }
    ,
    e.addAnimation = function(e, i, s, n) {
        if (this._data)
            throw t.ERR_RUNNING;
        this._animations[e] = {
            frames: i,
            next: s,
            frequency: n
        }
    }
    ,
    e.addMovieClip = function(e, i, s, n, r, o) {
        if (this._data)
            throw t.ERR_RUNNING;
        var a = e.frameBounds
            , h = i || e.bounds || e.nominalBounds;
        if (!h && e.getBounds && (h = e.getBounds()),
        h || a) {
            var l, c, u = this._frames.length, p = e.timeline.duration;
            for (l = 0; p > l; l++) {
                var d = a && a[l] ? a[l] : h;
                this.addFrame(e, d, s, this._setupMovieClipFrame, {
                    i: l,
                    f: n,
                    d: r
                })
            }
            var f = e.timeline._labels
                , v = [];
            for (var g in f)
                v.push({
                    index: f[g],
                    label: g
                });
            if (v.length)
                for (v.sort(function(t, e) {
                    return t.index - e.index
                }),
                l = 0,
                c = v.length; c > l; l++) {
                    for (var m = v[l].label, y = u + v[l].index, w = u + (l == c - 1 ? p : v[l + 1].index), x = [], _ = y; w > _; _++)
                        x.push(_);
                    (!o || (m = o(m, e, y, w))) && this.addAnimation(m, x, !0)
                }
        }
    }
    ,
    e.build = function() {
        if (this._data)
            throw t.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(); )
            ;
        return this._endBuild(),
        this.spriteSheet
    }
    ,
    e.buildAsync = function(e) {
        if (this._data)
            throw t.ERR_RUNNING;
        this.timeSlice = e,
        this._startBuild();
        var i = this;
        this._timerID = setTimeout(function() {
            i._run()
        }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)))
    }
    ,
    e.stopAsync = function() {
        clearTimeout(this._timerID),
        this._data = null
    }
    ,
    e.clone = function() {
        throw "SpriteSheetBuilder cannot be cloned."
    }
    ,
    e.toString = function() {
        return "[SpriteSheetBuilder]"
    }
    ,
    e._startBuild = function() {
        var e = this.padding || 0;
        this.progress = 0,
        this.spriteSheet = null,
        this._index = 0,
        this._scale = this.scale;
        var i = [];
        this._data = {
            images: [],
            frames: i,
            animations: this._animations
        };
        var s = this._frames.slice();
        if (s.sort(function(t, e) {
            return t.height <= e.height ? -1 : 1
        }),
        s[s.length - 1].height + 2 * e > this.maxHeight)
            throw t.ERR_DIMENSIONS;
        for (var n = 0, r = 0, o = 0; s.length; ) {
            var a = this._fillRow(s, n, o, i, e);
            if (a.w > r && (r = a.w),
            n += a.h,
            !a.h || !s.length) {
                var h = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                h.width = this._getSize(r, this.maxWidth),
                h.height = this._getSize(n, this.maxHeight),
                this._data.images[o] = h,
                a.h || (r = n = 0,
                o++)
            }
        }
    }
    ,
    e._setupMovieClipFrame = function(t, e) {
        var i = t.actionsEnabled;
        t.actionsEnabled = !1,
        t.gotoAndStop(e.i),
        t.actionsEnabled = i,
        e.f && e.f(t, e.d, e.i)
    }
    ,
    e._getSize = function(t, e) {
        for (var i = 4; Math.pow(2, ++i) < t; )
            ;
        return Math.min(e, Math.pow(2, i))
    }
    ,
    e._fillRow = function(e, i, s, n, r) {
        var o = this.maxWidth
            , a = this.maxHeight;
        i += r;
        for (var h = a - i, l = r, c = 0, u = e.length - 1; u >= 0; u--) {
            var p = e[u]
                , d = this._scale * p.scale
                , f = p.sourceRect
                , v = p.source
                , g = Math.floor(d * f.x - r)
                , m = Math.floor(d * f.y - r)
                , y = Math.ceil(d * f.height + 2 * r)
                , w = Math.ceil(d * f.width + 2 * r);
            if (w > o)
                throw t.ERR_DIMENSIONS;
            y > h || l + w > o || (p.img = s,
            p.rect = new createjs.Rectangle(l,i,w,y),
            c = c || y,
            e.splice(u, 1),
            n[p.index] = [l, i, w, y, s, Math.round(-g + d * v.regX - r), Math.round(-m + d * v.regY - r)],
            l += w)
        }
        return {
            w: l,
            h: c
        }
    }
    ,
    e._endBuild = function() {
        this.spriteSheet = new createjs.SpriteSheet(this._data),
        this._data = null,
        this.progress = 1,
        this.dispatchEvent("complete")
    }
    ,
    e._run = function() {
        for (var t = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), e = (new Date).getTime() + t, i = !1; e > (new Date).getTime(); )
            if (!this._drawNext()) {
                i = !0;
                break
            }
        if (i)
            this._endBuild();
        else {
            var s = this;
            this._timerID = setTimeout(function() {
                s._run()
            }, 50 - t)
        }
        var n = this.progress = this._index / this._frames.length;
        if (this.hasEventListener("progress")) {
            var r = new createjs.Event("progress");
            r.progress = n,
            this.dispatchEvent(r)
        }
    }
    ,
    e._drawNext = function() {
        var t = this._frames[this._index]
            , e = t.scale * this._scale
            , i = t.rect
            , s = t.sourceRect
            , n = this._data.images[t.img]
            , r = n.getContext("2d");
        return t.funct && t.funct(t.source, t.data),
        r.save(),
        r.beginPath(),
        r.rect(i.x, i.y, i.width, i.height),
        r.clip(),
        r.translate(Math.ceil(i.x - s.x * e), Math.ceil(i.y - s.y * e)),
        r.scale(e, e),
        t.source.draw(r),
        r.restore(),
        ++this._index < this._frames.length
    }
    ,
    createjs.SpriteSheetBuilder = createjs.promote(t, "EventDispatcher")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t) {
        this.DisplayObject_constructor(),
        "string" == typeof t && (t = document.getElementById(t)),
        this.mouseEnabled = !1;
        var e = t.style;
        e.position = "absolute",
        e.transformOrigin = e.WebkitTransformOrigin = e.msTransformOrigin = e.MozTransformOrigin = e.OTransformOrigin = "0% 0%",
        this.htmlElement = t,
        this._oldProps = null
    }
    var e = createjs.extend(t, createjs.DisplayObject);
    e.isVisible = function() {
        return null != this.htmlElement
    }
    ,
    e.draw = function() {
        return !0
    }
    ,
    e.cache = function() {}
    ,
    e.uncache = function() {}
    ,
    e.updateCache = function() {}
    ,
    e.hitTest = function() {}
    ,
    e.localToGlobal = function() {}
    ,
    e.globalToLocal = function() {}
    ,
    e.localToLocal = function() {}
    ,
    e.clone = function() {
        throw "DOMElement cannot be cloned."
    }
    ,
    e.toString = function() {
        return "[DOMElement (name=" + this.name + ")]"
    }
    ,
    e._tick = function(t) {
        var e = this.getStage();
        e && e.on("drawend", this._handleDrawEnd, this, !0),
        this.DisplayObject__tick(t)
    }
    ,
    e._handleDrawEnd = function() {
        var t = this.htmlElement;
        if (t) {
            var e = t.style
                , i = this.getConcatenatedDisplayProps(this._props)
                , s = i.matrix
                , n = i.visible ? "visible" : "hidden";
            if (n != e.visibility && (e.visibility = n),
            i.visible) {
                var r = this._oldProps
                    , o = r && r.matrix
                    , a = 1e4;
                if (!o || !o.equals(s)) {
                    var h = "matrix(" + (s.a * a | 0) / a + "," + (s.b * a | 0) / a + "," + (s.c * a | 0) / a + "," + (s.d * a | 0) / a + "," + (s.tx + .5 | 0);
                    e.transform = e.WebkitTransform = e.OTransform = e.msTransform = h + "," + (s.ty + .5 | 0) + ")",
                    e.MozTransform = h + "px," + (s.ty + .5 | 0) + "px)",
                    r || (r = this._oldProps = new createjs.DisplayProps(!0,0 / 0)),
                    r.matrix.copy(s)
                }
                r.alpha != i.alpha && (e.opacity = "" + (i.alpha * a | 0) / a,
                r.alpha = i.alpha)
            }
        }
    }
    ,
    createjs.DOMElement = createjs.promote(t, "DisplayObject")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {}
    var e = t.prototype;
    e.getBounds = function(t) {
        return t
    }
    ,
    e.applyFilter = function(t, e, i, s, n, r, o, a) {
        r = r || t,
        null == o && (o = e),
        null == a && (a = i);
        try {
            var h = t.getImageData(e, i, s, n)
        } catch (l) {
            return !1
        }
        return this._applyFilter(h) ? (r.putImageData(h, o, a),
        !0) : !1
    }
    ,
    e.toString = function() {
        return "[Filter]"
    }
    ,
    e.clone = function() {
        return new t
    }
    ,
    e._applyFilter = function() {
        return !0
    }
    ,
    createjs.Filter = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i) {
        (isNaN(t) || 0 > t) && (t = 0),
        (isNaN(e) || 0 > e) && (e = 0),
        (isNaN(i) || 1 > i) && (i = 1),
        this.blurX = 0 | t,
        this.blurY = 0 | e,
        this.quality = 0 | i
    }
    var e = createjs.extend(t, createjs.Filter);
    t.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1],
    t.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9],
    e.getBounds = function(t) {
        var e = 0 | this.blurX
            , i = 0 | this.blurY;
        if (0 >= e && 0 >= i)
            return t;
        var s = Math.pow(this.quality, .2);
        return (t || new createjs.Rectangle).pad(e * s + 1, i * s + 1, e * s + 1, i * s + 1)
    }
    ,
    e.clone = function() {
        return new t(this.blurX,this.blurY,this.quality)
    }
    ,
    e.toString = function() {
        return "[BlurFilter]"
    }
    ,
    e._applyFilter = function(e) {
        var i = this.blurX >> 1;
        if (isNaN(i) || 0 > i)
            return !1;
        var s = this.blurY >> 1;
        if (isNaN(s) || 0 > s)
            return !1;
        if (0 == i && 0 == s)
            return !1;
        var n = this.quality;
        (isNaN(n) || 1 > n) && (n = 1),
        n |= 0,
        n > 3 && (n = 3),
        1 > n && (n = 1);
        var r = e.data
            , o = 0
            , a = 0
            , h = 0
            , l = 0
            , c = 0
            , u = 0
            , p = 0
            , d = 0
            , f = 0
            , v = 0
            , g = 0
            , m = 0
            , y = 0
            , w = 0
            , x = 0
            , _ = i + i + 1 | 0
            , b = s + s + 1 | 0
            , T = 0 | e.width
            , C = 0 | e.height
            , k = T - 1 | 0
            , S = C - 1 | 0
            , P = i + 1 | 0
            , M = s + 1 | 0
            , A = {
            r: 0,
            b: 0,
            g: 0,
            a: 0
        }
            , D = A;
        for (h = 1; _ > h; h++)
            D = D.n = {
                r: 0,
                b: 0,
                g: 0,
                a: 0
            };
        D.n = A;
        var I = {
            r: 0,
            b: 0,
            g: 0,
            a: 0
        }
            , E = I;
        for (h = 1; b > h; h++)
            E = E.n = {
                r: 0,
                b: 0,
                g: 0,
                a: 0
            };
        E.n = I;
        for (var O = null, z = 0 | t.MUL_TABLE[i], j = 0 | t.SHG_TABLE[i], L = 0 | t.MUL_TABLE[s], B = 0 | t.SHG_TABLE[s]; n-- > 0; ) {
            p = u = 0;
            var F = z
                , R = j;
            for (a = C; --a > -1; ) {
                for (d = P * (m = r[0 | u]),
                f = P * (y = r[u + 1 | 0]),
                v = P * (w = r[u + 2 | 0]),
                g = P * (x = r[u + 3 | 0]),
                D = A,
                h = P; --h > -1; )
                    D.r = m,
                    D.g = y,
                    D.b = w,
                    D.a = x,
                    D = D.n;
                for (h = 1; P > h; h++)
                    l = u + ((h > k ? k : h) << 2) | 0,
                    d += D.r = r[l],
                    f += D.g = r[l + 1],
                    v += D.b = r[l + 2],
                    g += D.a = r[l + 3],
                    D = D.n;
                for (O = A,
                o = 0; T > o; o++)
                    r[u++] = d * F >>> R,
                    r[u++] = f * F >>> R,
                    r[u++] = v * F >>> R,
                    r[u++] = g * F >>> R,
                    l = p + ((l = o + i + 1) < k ? l : k) << 2,
                    d -= O.r - (O.r = r[l]),
                    f -= O.g - (O.g = r[l + 1]),
                    v -= O.b - (O.b = r[l + 2]),
                    g -= O.a - (O.a = r[l + 3]),
                    O = O.n;
                p += T
            }
            for (F = L,
            R = B,
            o = 0; T > o; o++) {
                for (u = o << 2 | 0,
                d = M * (m = r[u]) | 0,
                f = M * (y = r[u + 1 | 0]) | 0,
                v = M * (w = r[u + 2 | 0]) | 0,
                g = M * (x = r[u + 3 | 0]) | 0,
                E = I,
                h = 0; M > h; h++)
                    E.r = m,
                    E.g = y,
                    E.b = w,
                    E.a = x,
                    E = E.n;
                for (c = T,
                h = 1; s >= h; h++)
                    u = c + o << 2,
                    d += E.r = r[u],
                    f += E.g = r[u + 1],
                    v += E.b = r[u + 2],
                    g += E.a = r[u + 3],
                    E = E.n,
                    S > h && (c += T);
                if (u = o,
                O = I,
                n > 0)
                    for (a = 0; C > a; a++)
                        l = u << 2,
                        r[l + 3] = x = g * F >>> R,
                        x > 0 ? (r[l] = d * F >>> R,
                        r[l + 1] = f * F >>> R,
                        r[l + 2] = v * F >>> R) : r[l] = r[l + 1] = r[l + 2] = 0,
                        l = o + ((l = a + M) < S ? l : S) * T << 2,
                        d -= O.r - (O.r = r[l]),
                        f -= O.g - (O.g = r[l + 1]),
                        v -= O.b - (O.b = r[l + 2]),
                        g -= O.a - (O.a = r[l + 3]),
                        O = O.n,
                        u += T;
                else
                    for (a = 0; C > a; a++)
                        l = u << 2,
                        r[l + 3] = x = g * F >>> R,
                        x > 0 ? (x = 255 / x,
                        r[l] = (d * F >>> R) * x,
                        r[l + 1] = (f * F >>> R) * x,
                        r[l + 2] = (v * F >>> R) * x) : r[l] = r[l + 1] = r[l + 2] = 0,
                        l = o + ((l = a + M) < S ? l : S) * T << 2,
                        d -= O.r - (O.r = r[l]),
                        f -= O.g - (O.g = r[l + 1]),
                        v -= O.b - (O.b = r[l + 2]),
                        g -= O.a - (O.a = r[l + 3]),
                        O = O.n,
                        u += T
            }
        }
        return !0
    }
    ,
    createjs.BlurFilter = createjs.promote(t, "Filter")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t) {
        this.alphaMap = t,
        this._alphaMap = null,
        this._mapData = null
    }
    var e = createjs.extend(t, createjs.Filter);
    e.clone = function() {
        var e = new t(this.alphaMap);
        return e._alphaMap = this._alphaMap,
        e._mapData = this._mapData,
        e
    }
    ,
    e.toString = function() {
        return "[AlphaMapFilter]"
    }
    ,
    e._applyFilter = function(t) {
        if (!this.alphaMap)
            return !0;
        if (!this._prepAlphaMap())
            return !1;
        for (var e = t.data, i = this._mapData, s = 0, n = e.length; n > s; s += 4)
            e[s + 3] = i[s] || 0;
        return !0
    }
    ,
    e._prepAlphaMap = function() {
        if (!this.alphaMap)
            return !1;
        if (this.alphaMap == this._alphaMap && this._mapData)
            return !0;
        this._mapData = null;
        var t, e = this._alphaMap = this.alphaMap, i = e;
        e instanceof HTMLCanvasElement ? t = i.getContext("2d") : (i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"),
        i.width = e.width,
        i.height = e.height,
        t = i.getContext("2d"),
        t.drawImage(e, 0, 0));
        try {
            var s = t.getImageData(0, 0, e.width, e.height)
        } catch (n) {
            return !1
        }
        return this._mapData = s.data,
        !0
    }
    ,
    createjs.AlphaMapFilter = createjs.promote(t, "Filter")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t) {
        this.mask = t
    }
    var e = createjs.extend(t, createjs.Filter);
    e.applyFilter = function(t, e, i, s, n, r, o, a) {
        return this.mask ? (r = r || t,
        null == o && (o = e),
        null == a && (a = i),
        r.save(),
        t != r ? !1 : (r.globalCompositeOperation = "destination-in",
        r.drawImage(this.mask, o, a),
        r.restore(),
        !0)) : !0
    }
    ,
    e.clone = function() {
        return new t(this.mask)
    }
    ,
    e.toString = function() {
        return "[AlphaMaskFilter]"
    }
    ,
    createjs.AlphaMaskFilter = createjs.promote(t, "Filter")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s, n, r, o, a) {
        this.redMultiplier = null != t ? t : 1,
        this.greenMultiplier = null != e ? e : 1,
        this.blueMultiplier = null != i ? i : 1,
        this.alphaMultiplier = null != s ? s : 1,
        this.redOffset = n || 0,
        this.greenOffset = r || 0,
        this.blueOffset = o || 0,
        this.alphaOffset = a || 0
    }
    var e = createjs.extend(t, createjs.Filter);
    e.toString = function() {
        return "[ColorFilter]"
    }
    ,
    e.clone = function() {
        return new t(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)
    }
    ,
    e._applyFilter = function(t) {
        for (var e = t.data, i = e.length, s = 0; i > s; s += 4)
            e[s] = e[s] * this.redMultiplier + this.redOffset,
            e[s + 1] = e[s + 1] * this.greenMultiplier + this.greenOffset,
            e[s + 2] = e[s + 2] * this.blueMultiplier + this.blueOffset,
            e[s + 3] = e[s + 3] * this.alphaMultiplier + this.alphaOffset;
        return !0
    }
    ,
    createjs.ColorFilter = createjs.promote(t, "Filter")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t, e, i, s) {
        this.setColor(t, e, i, s)
    }
    var e = t.prototype;
    t.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10],
    t.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    t.LENGTH = t.IDENTITY_MATRIX.length,
    e.setColor = function(t, e, i, s) {
        return this.reset().adjustColor(t, e, i, s)
    }
    ,
    e.reset = function() {
        return this.copy(t.IDENTITY_MATRIX)
    }
    ,
    e.adjustColor = function(t, e, i, s) {
        return this.adjustHue(s),
        this.adjustContrast(e),
        this.adjustBrightness(t),
        this.adjustSaturation(i)
    }
    ,
    e.adjustBrightness = function(t) {
        return 0 == t || isNaN(t) ? this : (t = this._cleanValue(t, 255),
        this._multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]),
        this)
    }
    ,
    e.adjustContrast = function(e) {
        if (0 == e || isNaN(e))
            return this;
        e = this._cleanValue(e, 100);
        var i;
        return 0 > e ? i = 127 + e / 100 * 127 : (i = e % 1,
        i = 0 == i ? t.DELTA_INDEX[e] : t.DELTA_INDEX[e << 0] * (1 - i) + t.DELTA_INDEX[(e << 0) + 1] * i,
        i = 127 * i + 127),
        this._multiplyMatrix([i / 127, 0, 0, 0, .5 * (127 - i), 0, i / 127, 0, 0, .5 * (127 - i), 0, 0, i / 127, 0, .5 * (127 - i), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]),
        this
    }
    ,
    e.adjustSaturation = function(t) {
        if (0 == t || isNaN(t))
            return this;
        t = this._cleanValue(t, 100);
        var e = 1 + (t > 0 ? 3 * t / 100 : t / 100)
            , i = .3086
            , s = .6094
            , n = .082;
        return this._multiplyMatrix([i * (1 - e) + e, s * (1 - e), n * (1 - e), 0, 0, i * (1 - e), s * (1 - e) + e, n * (1 - e), 0, 0, i * (1 - e), s * (1 - e), n * (1 - e) + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]),
        this
    }
    ,
    e.adjustHue = function(t) {
        if (0 == t || isNaN(t))
            return this;
        t = this._cleanValue(t, 180) / 180 * Math.PI;
        var e = Math.cos(t)
            , i = Math.sin(t)
            , s = .213
            , n = .715
            , r = .072;
        return this._multiplyMatrix([s + e * (1 - s) + i * -s, n + e * -n + i * -n, r + e * -r + i * (1 - r), 0, 0, s + e * -s + .143 * i, n + e * (1 - n) + .14 * i, r + e * -r + i * -.283, 0, 0, s + e * -s + i * -(1 - s), n + e * -n + i * n, r + e * (1 - r) + i * r, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]),
        this
    }
    ,
    e.concat = function(e) {
        return e = this._fixMatrix(e),
        e.length != t.LENGTH ? this : (this._multiplyMatrix(e),
        this)
    }
    ,
    e.clone = function() {
        return (new t).copy(this)
    }
    ,
    e.toArray = function() {
        for (var e = [], i = 0, s = t.LENGTH; s > i; i++)
            e[i] = this[i];
        return e
    }
    ,
    e.copy = function(e) {
        for (var i = t.LENGTH, s = 0; i > s; s++)
            this[s] = e[s];
        return this
    }
    ,
    e.toString = function() {
        return "[ColorMatrix]"
    }
    ,
    e._multiplyMatrix = function(t) {
        var e, i, s, n = [];
        for (e = 0; 5 > e; e++) {
            for (i = 0; 5 > i; i++)
                n[i] = this[i + 5 * e];
            for (i = 0; 5 > i; i++) {
                var r = 0;
                for (s = 0; 5 > s; s++)
                    r += t[i + 5 * s] * n[s];
                this[i + 5 * e] = r
            }
        }
    }
    ,
    e._cleanValue = function(t, e) {
        return Math.min(e, Math.max(-e, t))
    }
    ,
    e._fixMatrix = function(e) {
        return e instanceof t && (e = e.toArray()),
        e.length < t.LENGTH ? e = e.slice(0, e.length).concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH)) : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)),
        e
    }
    ,
    createjs.ColorMatrix = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t(t) {
        this.matrix = t
    }
    var e = createjs.extend(t, createjs.Filter);
    e.toString = function() {
        return "[ColorMatrixFilter]"
    }
    ,
    e.clone = function() {
        return new t(this.matrix)
    }
    ,
    e._applyFilter = function(t) {
        for (var e, i, s, n, r = t.data, o = r.length, a = this.matrix, h = a[0], l = a[1], c = a[2], u = a[3], p = a[4], d = a[5], f = a[6], v = a[7], g = a[8], m = a[9], y = a[10], w = a[11], x = a[12], _ = a[13], b = a[14], T = a[15], C = a[16], k = a[17], S = a[18], P = a[19], M = 0; o > M; M += 4)
            e = r[M],
            i = r[M + 1],
            s = r[M + 2],
            n = r[M + 3],
            r[M] = e * h + i * l + s * c + n * u + p,
            r[M + 1] = e * d + i * f + s * v + n * g + m,
            r[M + 2] = e * y + i * w + s * x + n * _ + b,
            r[M + 3] = e * T + i * C + s * k + n * S + P;
        return !0
    }
    ,
    createjs.ColorMatrixFilter = createjs.promote(t, "Filter")
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    function t() {
        throw "Touch cannot be instantiated"
    }
    t.isSupported = function() {
        return !!("ontouchstart"in window || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0)
    }
    ,
    t.enable = function(e, i, s) {
        return e && e.canvas && t.isSupported() ? e.__touch ? !0 : (e.__touch = {
            pointers: {},
            multitouch: !i,
            preventDefault: !s,
            count: 0
        },
        "ontouchstart"in window ? t._IOS_enable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_enable(e),
        !0) : !1
    }
    ,
    t.disable = function(e) {
        e && ("ontouchstart"in window ? t._IOS_disable(e) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && t._IE_disable(e),
        delete e.__touch)
    }
    ,
    t._IOS_enable = function(e) {
        var i = e.canvas
            , s = e.__touch.f = function(i) {
            t._IOS_handleEvent(e, i)
        }
        ;
        i.addEventListener("touchstart", s, !1),
        i.addEventListener("touchmove", s, !1),
        i.addEventListener("touchend", s, !1),
        i.addEventListener("touchcancel", s, !1)
    }
    ,
    t._IOS_disable = function(t) {
        var e = t.canvas;
        if (e) {
            var i = t.__touch.f;
            e.removeEventListener("touchstart", i, !1),
            e.removeEventListener("touchmove", i, !1),
            e.removeEventListener("touchend", i, !1),
            e.removeEventListener("touchcancel", i, !1)
        }
    }
    ,
    t._IOS_handleEvent = function(t, e) {
        if (t) {
            t.__touch.preventDefault && e.preventDefault && e.preventDefault();
            for (var i = e.changedTouches, s = e.type, n = 0, r = i.length; r > n; n++) {
                var o = i[n]
                    , a = o.identifier;
                o.target == t.canvas && ("touchstart" == s ? this._handleStart(t, a, e, o.pageX, o.pageY) : "touchmove" == s ? this._handleMove(t, a, e, o.pageX, o.pageY) : ("touchend" == s || "touchcancel" == s) && this._handleEnd(t, a, e))
            }
        }
    }
    ,
    t._IE_enable = function(e) {
        var i = e.canvas
            , s = e.__touch.f = function(i) {
            t._IE_handleEvent(e, i)
        }
        ;
        void 0 === window.navigator.pointerEnabled ? (i.addEventListener("MSPointerDown", s, !1),
        window.addEventListener("MSPointerMove", s, !1),
        window.addEventListener("MSPointerUp", s, !1),
        window.addEventListener("MSPointerCancel", s, !1),
        e.__touch.preventDefault && (i.style.msTouchAction = "none")) : (i.addEventListener("pointerdown", s, !1),
        window.addEventListener("pointermove", s, !1),
        window.addEventListener("pointerup", s, !1),
        window.addEventListener("pointercancel", s, !1),
        e.__touch.preventDefault && (i.style.touchAction = "none")),
        e.__touch.activeIDs = {}
    }
    ,
    t._IE_disable = function(t) {
        var e = t.__touch.f;
        void 0 === window.navigator.pointerEnabled ? (window.removeEventListener("MSPointerMove", e, !1),
        window.removeEventListener("MSPointerUp", e, !1),
        window.removeEventListener("MSPointerCancel", e, !1),
        t.canvas && t.canvas.removeEventListener("MSPointerDown", e, !1)) : (window.removeEventListener("pointermove", e, !1),
        window.removeEventListener("pointerup", e, !1),
        window.removeEventListener("pointercancel", e, !1),
        t.canvas && t.canvas.removeEventListener("pointerdown", e, !1))
    }
    ,
    t._IE_handleEvent = function(t, e) {
        if (t) {
            t.__touch.preventDefault && e.preventDefault && e.preventDefault();
            var i = e.type
                , s = e.pointerId
                , n = t.__touch.activeIDs;
            if ("MSPointerDown" == i || "pointerdown" == i) {
                if (e.srcElement != t.canvas)
                    return;
                n[s] = !0,
                this._handleStart(t, s, e, e.pageX, e.pageY)
            } else
                n[s] && ("MSPointerMove" == i || "pointermove" == i ? this._handleMove(t, s, e, e.pageX, e.pageY) : ("MSPointerUp" == i || "MSPointerCancel" == i || "pointerup" == i || "pointercancel" == i) && (delete n[s],
                this._handleEnd(t, s, e)))
        }
    }
    ,
    t._handleStart = function(t, e, i, s, n) {
        var r = t.__touch;
        if (r.multitouch || !r.count) {
            var o = r.pointers;
            o[e] || (o[e] = !0,
            r.count++,
            t._handlePointerDown(e, i, s, n))
        }
    }
    ,
    t._handleMove = function(t, e, i, s, n) {
        t.__touch.pointers[e] && t._handlePointerMove(e, i, s, n)
    }
    ,
    t._handleEnd = function(t, e, i) {
        var s = t.__touch
            , n = s.pointers;
        n[e] && (s.count--,
        t._handlePointerUp(e, i, !0),
        delete n[e])
    }
    ,
    createjs.Touch = t
}(),
self.createjs = self.createjs || {},
function() {
    "use strict";
    var t = createjs.EaselJS = createjs.EaselJS || {};
    t.version = "0.8.0",
    t.buildDate = "Thu, 15 Jan 2015 23:50:40 GMT"
}()