export function Bunny({ style }) {
  return (
    <div className="critter c-bunny" style={style}>
      <div className="wrap">
        <div className="ear l" /><div className="ear r" />
        <div className="body">
          <div className="eye l" /><div className="eye r" />
          <div className="cheek l" /><div className="cheek r" />
          <div className="mouth" />
          <div className="arm l" /><div className="arm r" />
        </div>
      </div>
    </div>
  )
}

export function Chick({ style }) {
  return (
    <div className="critter c-chick" style={style}>
      <div className="body">
        <div className="eye l" /><div className="eye r" />
        <div className="cheek l" /><div className="cheek r" />
        <div className="beak" />
        <div className="wing l" /><div className="wing r" />
      </div>
    </div>
  )
}

export function Bear({ style }) {
  return (
    <div className="critter c-bear" style={style}>
      <div className="ear l"><div className="ear-in" /></div>
      <div className="ear r"><div className="ear-in" /></div>
      <div className="body">
        <div className="eye l" /><div className="eye r" />
        <div className="cheek l" /><div className="cheek r" />
        <div className="snout" />
        <div className="nose" />
      </div>
    </div>
  )
}

export function Cat({ style }) {
  return (
    <div className="critter c-cat" style={style}>
      <div className="ear l"><div className="ear-in" /></div>
      <div className="ear r"><div className="ear-in" /></div>
      <div className="body">
        <div className="eye l" /><div className="eye r" />
        <div className="cheek l" /><div className="cheek r" />
        <div className="snout" />
        <div className="wd a" /><div className="wd b" /><div className="wd c" /><div className="wd d" />
      </div>
    </div>
  )
}

export function Frog({ style }) {
  return (
    <div className="critter c-frog" style={style}>
      <div className="etop l"><div className="edot" /></div>
      <div className="etop r"><div className="edot" /></div>
      <div className="body">
        <div className="cheek l" /><div className="cheek r" />
        <div className="mouth" />
      </div>
    </div>
  )
}

export function Panda({ style }) {
  return (
    <div className="critter c-panda" style={style}>
      <div className="ear l" /><div className="ear r" />
      <div className="body">
        <div className="patch l"><div className="pe" /></div>
        <div className="patch r"><div className="pe" /></div>
        <div className="nose" />
        <div className="cheek l" /><div className="cheek r" />
      </div>
    </div>
  )
}
