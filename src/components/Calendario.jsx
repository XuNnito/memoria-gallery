import React, { useState, useEffect, useRef } from 'react';
import './Calendario.css';
import ImagenTemporal from './ImagenTemporal'; 
import Mayo29Img from '../imagenes/Almita.jpg';
import Agosto18Img from '../imagenes/enfermera.jpg';
import Agosto19Img from '../imagenes/o.jpg';
const Calendario = () => {
  const [fecha, setFecha] = useState(new Date());
  const [animacion, setAnimacion] = useState('');
  const [imagenVisible, setImagenVisible] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const gridRef = useRef(null);

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const diasDeLaSemana = ['Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const primerDiaDelMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1).getDay();
  const diasEnElMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();

  const hoy = new Date();
  const diaActual = hoy.getDate();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();

  const siguienteMes = () => {
    setAnimacion('slide-out');
    setTimeout(() => {
      setFecha(new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1));
      setAnimacion('slide-in');
    }, 500);
  };

  const retrocederMes = () => {
    setAnimacion('slide-out');
    setTimeout(() => {
      setFecha(new Date(fecha.getFullYear(), fecha.getMonth() - 1, 1));
      setAnimacion('slide-in');
    }, 500);
  };

  const mostrarFechaActual = () => {
    setFecha(new Date(anioActual, mesActual, 1));
  };

  useEffect(() => {
    if (animacion === 'slide-in') {
      const timer = setTimeout(() => setAnimacion(''), 500);
      return () => clearTimeout(timer);
    }
  }, [animacion]);

  const fechasEspeciales = [
    { dia: 29, mes: 4, img: Mayo29Img },
    { dia: 18, mes: 7, img: Agosto18Img },
    { dia: 19, mes: 7, img: Agosto19Img },
  ];

  const abrirImagenTemporal = (imagen) => {
    setImagenSeleccionada(imagen);
    setImagenVisible(true);
  };

  const cerrarImagenTemporal = () => {
    setImagenVisible(false);
    setImagenSeleccionada(null);
  };

  const diasVaciosPrevios = Array.from({ length: (primerDiaDelMes + 6) % 7 }, (_, i) => (
    <div key={`vacio-previo-${i}`} className="grid-item day vacio"></div>
  ));

  const diasDelMes = Array.from({ length: diasEnElMes }, (_, i) => {
    const dia = i + 1;
    const esHoy = dia === diaActual && fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
    const fechaEspecial = fechasEspeciales.find(fechaEspecial => 
      fechaEspecial.dia === dia && fechaEspecial.mes === fecha.getMonth()
    );

    return (
      <div
        key={`dia-${i}`}
        className={`grid-item day ${esHoy ? 'hoy' : ''}`}
        style={{
          backgroundImage: fechaEspecial ? `url(${fechaEspecial.img})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        }}
        onClick={() => fechaEspecial && abrirImagenTemporal(fechaEspecial.img)}
      >
        <div className="dia-circulo">{dia}</div>
      </div>
    );
  });

  return (
    <div className="calendario-container">
      <h2>
        MOMORIA🤭 - {meses[fecha.getMonth()]} {fecha.getFullYear()}
      </h2>
      
      <div ref={gridRef} className={`grid-container ${animacion}`}>
        {diasDeLaSemana.map((dia, index) => (
          <div key={index} className="calendario">
            {dia}
          </div>
        ))}
        {diasVaciosPrevios}
        {diasDelMes}
      </div>
      <div className="botones-container">
        <button onClick={retrocederMes}>← Mes Anterior</button>
        <button onClick={siguienteMes}>Mes Siguiente →</button>
        <button onClick={mostrarFechaActual}>Hoy</button>
      </div>

      {/* Imagen Temporal */}
      {imagenVisible && (
        <ImagenTemporal imageUrl={imagenSeleccionada} onClose={cerrarImagenTemporal} />
      )}
    </div>
  );
};

export default Calendario;
