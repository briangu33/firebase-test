import * as React from 'react';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
    cursor: "pointer",
    fill: "#d00",
    stroke: "none",
    zIndex: 0
};

const pinStyleActive = {
    cursor: "pointer",
    fill: "#08d",
    zIndex: 1
}

export default class CityPin extends React.PureComponent<CityPinProps, CityPinState> {

    private onClick = () => {
        this.props.onClick(this.props.index);
    }

    public render() {
        const {size = 20, onClick} = this.props;
        let thisStyle = this.props.selected ? pinStyleActive : pinStyle;

        return (
            <svg height={size} viewBox="0 0 24 24"
                 style={{...thisStyle, transform: `translate(${-size/2}px,${-size}px)`}}
                 onClick={this.onClick} >
                <path d={ICON}/>
            </svg>
        );
    }
}

export interface CityPinProps {
    size: number;
    onClick: (index: number) => void;
    selected: boolean;
    index: number;
}

export interface CityPinState {

}