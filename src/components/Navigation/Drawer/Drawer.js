import React, {Component} from "react";
import classes from './Drawer.module.scss'

const links = [1,2,3,4]

class Drawer extends Component {

  renderLinks() {
    return links.map((link, index) => {
      return(
        <li key={index}>
          <a href={link}>Link {link}</a>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]
    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return(
      <nav className={cls.join(' ')}>
        <ul>
          { this.renderLinks() }
        </ul>
      </nav>
    )
  }
}

export default Drawer