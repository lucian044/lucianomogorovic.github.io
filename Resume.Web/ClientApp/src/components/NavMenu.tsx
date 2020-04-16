import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {

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
                        className='link active'
                        id='home'
                        onClick={() => this.changeActiveLink('home')}>Home</Link>
                    <Link
                        to="/resume"
                        className='link'
                        id='resume'
                        onClick={() => this.changeActiveLink('resume')}>Resume</Link>
                    <Link
                        to="/accomplishments"
                        className='link'
                        id='accomplishments'
                        onClick={() => this.changeActiveLink('accomplishments')}>Accomplishments</Link>
                    <Link
                        to="/references"
                        className='link'
                        id='references'
                        onClick={() => this.changeActiveLink('references')}>References</Link>
                    <Link
                        to="/contact"
                        className='link'
                        id='contact'
                        onClick={() => this.changeActiveLink('contact')}>Contact</Link>
                </div>
            </div>
        );
    }
}
