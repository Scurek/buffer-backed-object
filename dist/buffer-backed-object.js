function O(t) {
  return typeof t == "symbol" ? !1 : !isNaN(t);
}
function z(t, e) {
  let i = t - t % e;
  return t % e != 0 && (i += e), i;
}
function T(t) {
  let e = 0;
  for (const { align: i = 1, size: r } of Object.values(t))
    e = z(e, i) + r;
  return e = z(e, U(t)), e;
}
function U(t) {
  return Math.max(...Object.values(t).map((e) => e.align ?? 1));
}
function B(t, e, { byteOffset: i = 0, length: r = 0, align: n = U(e) } = {}) {
  const u = new DataView(t, i);
  let c = 0;
  const f = {
    ...e
  };
  for (const [o, l] of Object.entries(f))
    f[o] = {
      ...l,
      offset: z(c, l.align ?? 1)
    }, c = f[o].offset + l.size;
  return c = z(c, n), r || (r = Math.floor((t.byteLength - i) / c)), new Proxy(new Array(r), {
    has(o, l) {
      return O(l) ? l < r : l === "buffer" ? !0 : l in o;
    },
    get(o, l, h) {
      if (l === "buffer")
        return t;
      if (!O(l)) {
        const x = Reflect.get(o, l, h);
        return typeof x == "function" ? x.bind(h) : x;
      }
      const g = parseInt(l), I = g * c;
      if (!(g >= o.length)) {
        if (!o[g]) {
          o[g] = {};
          for (const [x, w] of Object.entries(f))
            "get" in w && Object.defineProperty(o[g], x, {
              enumerable: !0,
              get() {
                return w.get(u, I + w.offset);
              },
              set(j) {
                return w.set(
                  u,
                  I + w.offset,
                  j
                );
              }
            });
          Object.freeze(o[g]);
        }
        return o[g];
      }
    }
  });
}
function _(t, e, { byteOffset: i = 0, align: r = 1 } = {}) {
  return B(t, e, {
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
function s({
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
function d({
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
function y({
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
function E({
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
function P({
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
function S({
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
function M({
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
function N() {
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
function b(t) {
  const e = T(t);
  return {
    type: "NestedBufferBackedObject",
    align: U(t),
    size: e,
    innerDescriptors: t,
    get: (i, r) => B(i.buffer, t, {
      byteOffset: i.byteOffset + r,
      length: 1
    })[0],
    set: (i, r, n) => {
      throw Error("Cannot set an entire struct");
    }
  };
}
function R(t, e) {
  const i = T(e) * t;
  return {
    type: "NestedArrayOfBufferBackedObjects",
    align: Object.values(e)[0].align ?? 1,
    size: i,
    innerDescriptors: e,
    get: (r, n) => B(r.buffer, e, {
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
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e })
  }, r = b(i);
  return {
    ...r,
    get: (n, u) => {
      const c = r.get(n, u);
      return new Proxy(c, {
        get(f, o) {
          return o === "r" ? f.x : o === "g" ? f.y : f[o];
        },
        set(f, o, l) {
          return o === "r" ? (f.x = l, !0) : o === "g" ? (f.y = l, !0) : (f[o] = l, !0);
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
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e }),
    z: E({ endianness: t, align: e })
  }, r = b(i);
  return {
    ...r,
    get: (n, u) => {
      const c = r.get(n, u);
      return new Proxy(c, {
        get(f, o) {
          return o === "r" ? f.x : o === "g" ? f.y : o === "b" ? f.z : f[o];
        },
        set(f, o, l) {
          return o === "r" ? (f.x = l, !0) : o === "g" ? (f.y = l, !0) : o === "b" ? (f.z = l, !0) : (f[o] = l, !0);
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
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e }),
    z: E({ endianness: t, align: e }),
    w: E({ endianness: t, align: e })
  }, r = b(i);
  return {
    ...r,
    get: (n, u) => {
      const c = r.get(n, u);
      return new Proxy(c, {
        get(f, o) {
          return o === "r" ? f.x : o === "g" ? f.y : o === "b" ? f.z : o === "a" ? f.w : f[o];
        },
        set(f, o, l) {
          return o === "r" ? (f.x = l, !0) : o === "g" ? (f.y = l, !0) : o === "b" ? (f.z = l, !0) : o === "a" ? (f.w = l, !0) : (f[o] = l, !0);
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
    x: E({ endianness: t, align: e }),
    y: E({ endianness: t, align: e }),
    z: E({ endianness: t, align: e }),
    w: E({ endianness: t, align: e })
  }, r = b(i);
  return {
    ...r,
    get: (n, u) => {
      const c = r.get(n, u);
      return [c.x, c.y, c.z, c.w];
    },
    set(n, u, c) {
      const f = r.get(n, u);
      f.x = c.length > 0 ? c[0] : 0, f.y = c.length > 1 ? c[1] : 0, f.z = c.length > 2 ? c[2] : 0, f.w = c.length > 3 ? c[3] : 0;
    }
  };
}
function m({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return b({
    x: s({ endianness: t, align: e }),
    y: s({ endianness: t, align: e })
  });
}
function q({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return b({
    x: s({ endianness: t, align: e }),
    y: s({ endianness: t, align: e }),
    z: s({ endianness: t, align: e })
  });
}
function G({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return b({
    x: s({ endianness: t, align: e }),
    y: s({ endianness: t, align: e }),
    z: s({ endianness: t, align: e }),
    w: s({ endianness: t, align: e })
  });
}
function H({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return b({
    x: y({ endianness: t, align: e }),
    y: y({ endianness: t, align: e })
  });
}
function J({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return b({
    x: y({ endianness: t, align: e }),
    y: y({ endianness: t, align: e }),
    z: y({ endianness: t, align: e })
  });
}
function K({
  endianness: t = "little",
  align: e = 4
} = {}) {
  return b({
    x: y({ endianness: t, align: e }),
    y: y({ endianness: t, align: e }),
    z: y({ endianness: t, align: e }),
    w: y({ endianness: t, align: e })
  });
}
export {
  B as ArrayOfBufferBackedObjects,
  S as BigInt64,
  M as BigUint64,
  F as BoolUint32,
  _ as BufferBackedObject,
  E as Float32,
  $ as Float32Vec4,
  D as Float32x2,
  V as Float32x3,
  C as Float32x4,
  P as Float64,
  d as Int16,
  y as Int32,
  H as Int32x2,
  J as Int32x3,
  K as Int32x4,
  L as Int8,
  R as NestedArrayOfBufferBackedObjects,
  b as NestedBufferBackedObject,
  Y as UTF8String,
  A as Uint16,
  s as Uint32,
  m as Uint32x2,
  q as Uint32x3,
  G as Uint32x4,
  N as Uint8,
  z as nextAlign,
  k as reserved,
  U as structAlign,
  T as structSize
};
