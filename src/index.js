import './index.css'

import Accordion from './components/js/accordion'
import Alert from './components/js/alert'
import Drawer from './components/js/drawer'
import Dropdown from './components/js/dropdown'
import Modal from './components/js/modal'
import Slidedown from './components/js/slidedown'
import Tab from './components/js/tab'

addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion').forEach((el) => { new Accordion(el) })
  document.querySelectorAll('.alert').forEach((el) => { new Alert(el) })
  document.querySelectorAll('.drawer').forEach((el) => { new Drawer(el) })
  document.querySelectorAll('.dropdown').forEach((el) => { new Dropdown(el) })
  document.querySelectorAll('.modal').forEach((el) => { new Modal(el) })
  document.querySelectorAll('.slidedown').forEach((el) => { new Slidedown(el) })
  document.querySelectorAll('.tab').forEach((el) => { new Tab(el) })
})