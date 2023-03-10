import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where("games.title LIKE :param", { param })
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = await this.repository.query("SELECT COUNT(id) FROM games")

    return [{ count }]; // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
    .createQueryBuilder("games")
    .where("games.id = :id", { id })
    .getOne()

    return game.users
  }
}
