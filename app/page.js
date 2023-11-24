import './styles/fonts.css';
import style from './page.module.css';

export default function HomePage() {
  return (
    <div className={style.herosection}>
      <h1 className={style.h1}>
        Bla <br />
        Blabla
      </h1>
      <h2 className={style.h2}>
        I don't <br />
        have a name yet.
      </h2>
    </div>
  );
}
