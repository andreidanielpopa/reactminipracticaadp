import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'

export default class JugadoresEquipos extends Component {
    urlApi = Global.urlApiEquipos;
    selectJugador = React.createRef();
    cajaNombre = React.createRef();

    state = {
        equipos: [],
        jugadores: null,
    }

    buscarJugadores = (e) => {
        e.preventDefault();
        let idEquipo = this.selectJugador.current.value;
        let request = 'api/Jugadores/JugadoresEquipos/' + idEquipo;
        axios.get(this.urlApi + request).then(response => {
            this.setState({
                jugadores: response.data
            })
        })

    }

    buscarJugadoresPorNombre = (e) => {
        e.preventDefault();
        let nombreJugador = this.cajaNombre.current.value;
        let request = 'api/Jugadores/FindJugadores/' + nombreJugador;
        axios.get(this.urlApi + request).then(response => {
            this.setState({
                jugadores: response.data
            })
        })

    }

    loadEquipos = () => {

        let request = 'api/Equipos';
        axios.get(this.urlApi + request).then(response => {

            this.setState({
                equipos: response.data
            })
        })

    }

    componentDidMount = () => {

        this.loadEquipos();
    }

    render() {
        return (
            <div>
                <h1>Jugadores Equipos</h1>
                <form>
                    <label>Nombre Jugador</label>
                    <input type='text' ref={this.cajaNombre} />
                    <button onClick={this.buscarJugadoresPorNombre}>Buscar por NOMBRE</button>
                </form>
                <hr />
                <form>
                    <label>Seleccione un equipo</label>
                    <select ref={this.selectJugador}>
                        {
                            this.state.equipos.map((equipo, index) => {
                                return (
                                    <option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={this.buscarJugadores}>Buscar Jugadores</button>
                </form>
                {this.state.jugadores &&
                (<table border={1}>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Posicion</th>
                            <th>Pais</th>
                            <th>Fecha nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jugadores.map((jugador, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={jugador.imagen} alt={jugador.nombre} style={{ width: 150, height: 200 }} /></td>
                                        <td>{jugador.nombre}</td>
                                        <td>{jugador.posicion}</td>
                                        <td>{jugador.pais}</td>
                                        <td>{jugador.fechaNacimiento}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>)}
            </div>
        )
    }
}
