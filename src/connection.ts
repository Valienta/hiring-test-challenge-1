import { createConnection, Connection } from 'typeorm';
import ormconfig from './ormconfig';

async function connect(): Promise<Connection> {
  return createConnection(ormconfig);
}

export default connect;
