import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {

    componentDidMount() {
        var locationPathname = window.location.pathname.replace('/', '');
        var currentPage = locationPathname ? locationPathname : 'home';
        var currentLink = document.getElementById(currentPage);
        if (currentLink) {
            currentLink.className = 'link active';
        }
    }

    changeActiveLink(active: string) {
        var links = document.getElementsByClassName('link');
        Array.from(links).forEach((link) => {
            link.className = 'link';
        });

        var activeLink = document.getElementById(active);
        if (activeLink) {
            activeLink.className = 'link active';
        }
    }

    public render() {
        return (
            <div className='nav-menu'>
                <img className="headshot" src="/images/Headshot.jpg" alt="Luciano Mogorovic" />
                <div className='link-grid'>
                    <Link
                        to="/"
                        className='link'
                        id='home'
                        onClick={() => this.changeActiveLink('home')}>
                            <div className='two-row-grid'>
                                <i className="fas fa-home"></i>
                                Home
                            </div>
                    </Link>
                    <Link
                        to="/resume"
                        className='link'
                        id='resume'
                        onClick={() => this.changeActiveLink('resume')}>
                            <div className="two-row-grid">
                                <i className="fas fa-list-ul"></i>
                                Resume
                            </div>
                    </Link>
                    <Link
                        to="/accomplishments"
                        className='link'
                        id='accomplishments'
                        onClick={() => this.changeActiveLink('accomplishments')}>
                            <div className="two-row-grid">
                                <i className="fas fa-trophy"></i>
                                Accomplishments
                            </div>
                    </Link>
                    <Link
                        to="/references"
                        className='link'
                        id='references'
                        onClick={() => this.changeActiveLink('references')}>
                            <div className="two-row-grid">
                                <i className="fas fa-users"></i>
                                References
                            </div>
                    </Link>
                    <Link
                        to="/contact"
                        className='link'
                        id='contact'
                        onClick={() => this.changeActiveLink('contact')}>
                            <div className="two-row-grid">
                                <i className="fas fa-phone"></i>
                                Contact
                            </div>
                    </Link>
                </div>
            </div>
        );
    }
}
