import React from 'react';
import { Trans } from 'react-i18next';
import './Footer.css'

const Footer: React.FC = () => {
    return (
        <footer>
            <p><Trans i18nKey="copyright-fluentc-inc">FluentC</Trans> &copy; 2023</p>
        </footer>
    )
}

export default Footer;