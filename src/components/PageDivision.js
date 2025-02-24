import ReactW from 'react'
import Menu from '@/components/Menu';

export default function PageDivision({ children }) {
  return (
    <div className='main'> 
      <Menu />
      <div className='feed'>
        {children}
      </div>
    </div>
  );
}
