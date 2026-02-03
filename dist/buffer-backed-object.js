function j(t) {
  return typeof t == "symbol" ? !1 : !isNaN(t);
}
function z(t, e) {
  let i = t - t % e;
  return t % e != 0 && (i += e), i;
}
function O(t) {
  let e = 0;
  for (const { align: i = 1, size: r } of Object.values(t))
    e = z(e, i) + r;
  return e = z(e, h(t)), e;
}
function h(t) {
  return Math.max(...Object.values(t).map((e) => e.align ?? 1));
}
function U(t, e, { byteOffset: i = 0, length: r = 0, align: n = h(e) } = {}) {
  const u = new DataView(t, i);
  let o = 0;
  const f = {
    ...e
  };
  for (const [c, l] of Object.entries(f))
    f[c] = {
      ...l,
      offset: z(o, l.align ?? 1)
    }, o = f[c].offset + l.size;
  return o = z(o, n), r || (r = Math.floor((t.byteLength - i) / o)), new Proxy(new Array(r), {
    has(c, l) {
      return j(l) ? l < r : l === "buffer" ? !0 : l in c;
    },
    get(c, l, B) {
      if (l === "buffer")
        return t;
      if (!j(l)) {
        const x = Reflect.get(c, l, B);
        return typeof x == "function" ? x.bind(B) : x;
      }
      const g = parseInt(l), I = g * o;
      if (!(g >= c.length)) {
        if (!c[g]) {
          c[g] = {};
          for (const [x, w] of Object.entries(f))
            "get" in w && Object.defineProperty(c[g], x, {
              enumerable: !0,
              get() {
                return w.get(u, I + w.offset);
              },
              set(T) {
                return w.set(
                  u,
                  I + w.offset,
                  T
                );
              }
            });
          Object.freeze(c[g]);
        }
        return c[g];
      }
    }
  });
}
function _(t, e, { byteOffset: i = 0, align: r = 1 } = {}) {
  return U(t, e, {
    byteOffset: i,
    align: r
  })[0];
}
function A({
  endianness: t = "little",
  align: e = 2
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "Uint16",
    align: e,
    size: Uint16Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getUint16(n, i),
    set: (r, n, u) => r.setUint16(n, u, i)
  };
}
function b({
  endianness: t = "little",
  align: e = 4
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "Uint32",
    align: e,
    size: Uint32Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getUint32(n, i),
    set: (r, n, u) => r.setUint32(n, u, i)
  };
}
function F({
  endianness: t = "little",
  align: e = 4
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "Uint32",
    align: e,
    size: Uint32Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getUint32(n, i) !== 0,
    set: (r, n, u) => r.setUint32(n, Number(u), i)
  };
}
function P({
  endianness: t = "little",
  align: e = 2
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "Int16",
    align: e,
    size: Int16Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getInt16(n, i),
    set: (r, n, u) => r.setInt16(n, u, i)
  };
}
function E({
  endianness: t = "little",
  align: e = 4
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "Int32",
    align: e,
    size: Int32Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getInt32(n, i),
    set: (r, n, u) => r.setInt32(n, u, i)
  };
}
function s({
  endianness: t = "little",
  align: e = 4
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "Float32",
    align: e,
    size: Float32Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getFloat32(n, i),
    set: (r, n, u) => r.setFloat32(n, u, i)
  };
}
function S({
  endianness: t = "little",
  align: e = 8
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "Float64",
    align: e,
    size: Float64Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getFloat64(n, i),
    set: (r, n, u) => r.setFloat64(n, u, i)
  };
}
function M({
  endianness: t = "little",
  align: e = 8
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "BigInt64",
    align: e,
    size: BigInt64Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getBigInt64(n, i),
    set: (r, n, u) => r.setBigInt64(n, u, i)
  };
}
function N({
  endianness: t = "little",
  align: e = 8
} = {}) {
  if (t !== "big" && t !== "little")
    throw Error("Endianness needs to be either 'big' or 'little'");
  const i = t === "little";
  return {
    type: "BigUint64",
    align: e,
    size: BigUint64Array.BYTES_PER_ELEMENT,
    get: (r, n) => r.getBigUint64(n, i),
    set: (r, n, u) => r.setBigUint64(n, u, i)
  };
}
function d() {
  return {
    type: "Uint8",
    align: 1,
    size: 1,
    get: (t, e) => t.getUint8(e),
    set: (t, e, i) => t.setUint8(e, i)
  };
}
function L() {
  return {
    type: "Int8",
    align: 1,
    size: 1,
    get: (t, e) => t.getInt8(e),
    set: (t, e, i) => t.setInt8(e, i)
  };
}
function y(t) {
  const e = O(t);
  return {
    type: "NestedBufferBackedObject",
    align: h(t),
    size: e,
    innerDescriptors: t,
    get: (i, r) => U(i.buffer, t, {
      byteOffset: i.byteOffset + r,
      length: 1
    })[0],
    set: (i, r, n) => {
      throw Error("Cannot set an entire struct");
    }
  };
}
function R(t, e) {
  const i = O(e) * t;
  return {
    type: "NestedArrayOfBufferBackedObjects",
    align: Object.values(e)[0].align ?? 1,
    size: i,
    innerDescriptors: e,
    get: (r, n) => U(r.buffer, e, {
      byteOffset: n + r.byteOffset,
      length: t
    }),
    set: (r, n, u) => {
      throw Error("Cannot set an entire array");
    }
  };
}
function Y(t) {
  return {
    type: "UTF8String",
    align: 1,
    size: t,
    get: (e, i) => new TextDecoder().decode(new Uint8Array(e.buffer, i, t)).replace(/\u0000+$/, ""),
    set: (e, i, r) => {
      const n = new TextEncoder().encode(r), u = new Uint8Array(e.buffer, i, t);
      u.fill(0), u.set(n.subarray(0, t));
    }
  };
}
function k(t) {
  return { type: "reserved", align: 1, size: t, get() {
  }, set() {
  } };
}
function D({
  endianness: t = "little",
  align: e = 4
} = {}) {
  const i = {
    x: s({ endianness: t, align: e }),
    y: s({ endianness: t, align: e })
  }, r = y(i);
  return {
    ...r,
    get: (n, u) => {
      const o = r.get(n, u);
      return new Proxy(o, {
        get(f, c) {
          return c === "r" ? f.x : c === "g" ? f.y : f[c];
        },
        set(f, c, l) {
          return c === "r" ? (f.x = l, !0) : c === "g" ? (f.y = l, !0) : (f[c] = l, !0);
        }
      });
    }
  };
}
function V({
  endianness: t = "little",
  align: e = 4
} = {}) {
  const i = {
    x: s({ endianness: t, align: e }),
    y: s({ endianness: t, align: e }),
    z: s({ endianness: t, align: e })
  }, r = y(i);
  return {
    ...r,
    get: (n, u) => {
      const o = r.get(n, u);
      return new Proxy(o, {
        get(f, c) {
          return c === "r" ? f.x : c === "g" ? f.y : c === "b" ? f.z : f[c];
        },
        set(f, c, l) {
          return c === "r" ? (f.x = l, !0) : c === "g" ? (f.y = l, !0) : c === "b" ? (f.z = l, !0) : (f[c] = l, !0);
        }
      });
    }
  };
}
function C({
  endianness: t = "little",
  align: e = 4
} = {}) {
  const i = {
    x: s({ endianness: t, align: e }),
    y: s({ endianness: t, align: e }),
    z: s({ endianness: t, align: e }),
    w: s({ endianness: t, align: e })
  }, r = y(i);
  return {
    ...r,
    get: (n, u) => {
      const o = r.get(n, u);
      return new Proxy(o, {
        get(f, c) {
          return c === "r" ? f.x : c === "g" ? f.y : c === "b" ? f.z : c === "a" ? f.w : f[c];
        },
        set(f, c, l) {
          return c === "r" ? (f.x = l, !0) : c === "g" ? (f.y = l, !0) : c === "b" ? (f.z = l, !0) : c === "a" ? (f.w = l, !0) : (f[c] = l, !0);
        }
      });
    }
  };
}
function $({
  endianness: t = "little",
  align: e = 4
} = {}) {
  const i = {
    x: s({ endianness: t, align: e }),
    y: s({ endianness: t, align: e }),
    z: s({ endianness: t, align: e }),
    w: s({ endianness: t, align: e })
  }, r = y(i);
  return {
    ...r,
    get: (n, u) => {
      const o = r.get(n, u);
      return [o.x, o.y, o.z, o.w];
    },
    set(n, u, o) {
      const f = r.get(n, u);
      f.x = o.length > 0 ? o[0] : 0, f.y = o.length > 1 ? o[1] : 0, f.z = o.length > 2 ? o[2] : 0, f.w = o.length > 3 ? o[3] : 0;
    }
  };
}
function m({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return y({
    x: b({ endianness: t, align: e }),
    y: b({ endianness: t, align: e })
  });
}
function q({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return y({
    x: b({ endianness: t, align: e }),
    y: b({ endianness: t, align: e }),
    z: b({ endianness: t, align: e })
  });
}
function G({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return y({
    x: b({ endianness: t, align: e }),
    y: b({ endianness: t, align: e }),
    z: b({ endianness: t, align: e }),
    w: b({ endianness: t, align: e })
  });
}
function H({
  endianness: t = "little",
  align: e = 4
} = {}) {
  const i = {
    x: b({ endianness: t, align: e }),
    y: b({ endianness: t, align: e }),
    z: b({ endianness: t, align: e }),
    w: b({ endianness: t, align: e })
  }, r = y(i);
  return {
    ...r,
    get: (n, u) => {
      const o = r.get(n, u);
      return [o.x, o.y, o.z, o.w];
    },
    set(n, u, o) {
      const f = r.get(n, u);
      f.x = o.length > 0 ? o[0] : 0, f.y = o.length > 1 ? o[1] : 0, f.z = o.length > 2 ? o[2] : 0, f.w = o.length > 3 ? o[3] : 0;
    }
  };
}
function J({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return y({
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e })
  });
}
function K({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return y({
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e }),
    z: E({ endianness: t, align: e })
  });
}
function Q({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return y({
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e }),
    z: E({ endianness: t, align: e }),
    w: E({ endianness: t, align: e })
  });
}
function W({
  endianness: t = "little",
  align: e = 4
} = {}) {
  const i = {
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e }),
    z: E({ endianness: t, align: e }),
    w: E({ endianness: t, align: e })
  }, r = y(i);
  return {
    ...r,
    get: (n, u) => {
      const o = r.get(n, u);
      return [o.x, o.y, o.z, o.w];
    },
    set(n, u, o) {
      const f = r.get(n, u);
      f.x = o.length > 0 ? o[0] : 0, f.y = o.length > 1 ? o[1] : 0, f.z = o.length > 2 ? o[2] : 0, f.w = o.length > 3 ? o[3] : 0;
    }
  };
}
export {
  U as ArrayOfBufferBackedObjects,
  M as BigInt64,
  N as BigUint64,
  F as BoolUint32,
  _ as BufferBackedObject,
  s as Float32,
  $ as Float32Vec4,
  D as Float32x2,
  V as Float32x3,
  C as Float32x4,
  S as Float64,
  P as Int16,
  E as Int32,
  W as Int32Vec4,
  J as Int32x2,
  K as Int32x3,
  Q as Int32x4,
  L as Int8,
  R as NestedArrayOfBufferBackedObjects,
  y as NestedBufferBackedObject,
  Y as UTF8String,
  A as Uint16,
  b as Uint32,
  H as Uint32Vec4,
  m as Uint32x2,
  q as Uint32x3,
  G as Uint32x4,
  d as Uint8,
  z as nextAlign,
  k as reserved,
  h as structAlign,
  O as structSize
};
