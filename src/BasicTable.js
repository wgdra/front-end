import clsx from 'clsx'
import styles from './BasicTable.module.scss'

export const BasicTableTwo = ({ headers, data }) => {
  return (
    <div className={styles.containerTableTwo}>
      <div
        className={clsx([styles.row, styles.header])}
        style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
      >
        {headers.map((header) => (
          <div key={header} className={styles.cell}>
            {header}
          </div>
        ))}
      </div>
      {data.map((item, index) => (
        <div
          key={item}
          className={clsx([styles.row, index % 2 !== 0 ? styles.odd : styles.even])}
          style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}
        >
          {item.map((value, index) => (
            <div
              key={value + index}
              className={clsx([styles.cell, value === '1.00' ? styles.colorRed : ''])}
              onClick={() => {
                console.log('haha')
              }}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
