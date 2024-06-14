import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public model: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(model: Query<T[], T>, query: Record<string, unknown>) {
    this.model = model;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm || '';

    this.model = this.model.find({
      $or: searchAbleFields.map(
        (field) =>
          ({
            [field]: { $regex: searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      ),
    });

    return this;
  }

  filter() {
    const query = { ...this?.query };

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete query[el]);

    this.model = this.model.find(query as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';

    this.model = this.model.sort(sort as string);
    return this;
  }

  pagination() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.model = this.model.skip(skip).limit(limit);

    return this;
  }

  select() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.model = this.model.select(fields);

    return this;
  }
}

export default QueryBuilder;
