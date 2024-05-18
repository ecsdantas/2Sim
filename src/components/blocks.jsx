export const inputPort = {
  type: 'input',
  name: 'in1',
  value: 10,
  ports: {
    in: [],
    out: { x: 0, y: 0 },
  },
  x: 50,
  y: 50,
  width: 40,
  height: 20,
  solve: function () {
    return this.value;
  },
};

export const gain = {
  type: 'gain',
  name: 'Gain1',
  value: 5,
  ports: {
    in: [{ x: 0, y: 0, link: null }],
    out: { x: 0, y: 0 },
  },
  x: 250,
  y: 50,
  width: 40,
  height: 20,
  solve: function () {
    const inputLink = this.ports.in[0].link;
    return inputLink?.solve ? this.value * inputLink.solve() : 'not gain input';
  },
};

export const add = {
  type: 'add',
  name: 'Add1',
  value: 0,
  ports: {
    in: [
      { x: 0, y: -5, link: null },
      { x: 0, y: 5, link: null },
    ],
    out: { x: 0, y: 0 },
  },
  x: 250,
  y: 140,
  width: 40,
  height: 20,
  solve: function () {
    const inputLink1 = this.ports.in[0].link;
    const inputLink2 = this.ports.in[1].link;
    return (inputLink1?.solve?.() ?? 0) + (inputLink2?.solve?.() ?? 0);
  },
};

export const outputPort = {
  type: 'output',
  name: 'Out1',
  value: 0,
  ports: {
    in: [{ x: 0, y: 0, link: null }],
    out: null,
  },
  x: 350,
  y: 50,
  width: 40,
  height: 20,
  solve: function () {
    const inputLink = this.ports.in[0].link;
    this.value = inputLink?.solve ? inputLink.solve() : 'Not computed';
  },
};
