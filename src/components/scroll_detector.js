import React, { Component } from 'react';

export default class ScrollDetector extends Component {
    timer = null;
    scrollY = window.scrollY;

    constructor(props) {
        super(props);

        this.state = { scrolled: false, scrollAmount: 0 };

        this.handleScroll.bind(this);
    }

    handleScroll() {
        const scrollAmount = window.scrollY - this.scrollY;
        if (scrollAmount > 25 || scrollAmount < -25) {
            this.scrollY = window.scrollY;
            this.setState({scrolled: true, scrollAmount});
            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
                this.setState({scrolled: false});
                this.timer = null;
            }, 1000)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', () => this.handleScroll());
    }

    render() {
        return (
            <div>{this.state.scrolled ? `Did you just scroll for ${this.state.scrollAmount}px?!` : ''}</div>
        );
    }
}