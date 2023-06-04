
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';


export default function SearchAppBar() {
  return(
    <>
    <footer className={styles.footer}>
    <a
      href="https://github.com/sittikiv"
      target="_blank"
      rel="noopener noreferrer"
    >
       <b>Create By Sittiporn Leklong</b>
    </a>
    </footer>
    </>
  )
}