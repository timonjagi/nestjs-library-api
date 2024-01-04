import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) { }

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async updateById(id: string, body: Book): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async deleteById(id: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(id, {
      new: true,
      runValidators: true,
    });
    return book;
  }
}
