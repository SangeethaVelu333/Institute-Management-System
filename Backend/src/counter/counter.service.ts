import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterDocument } from 'src/schemas/counter.schema';
@Injectable()
export class CounterService {
  constructor(
    @InjectModel('Counter')
    private readonly counterModel: Model<CounterDocument>,
  ) {}
  async create_counter(req_body) {
    const new_counter = new this.counterModel();
    new_counter._id = req_body._id;
    new_counter.sequence_value = req_body.sequence_value;
    await new_counter.save();
    return new_counter;
  }
  async get_counter(counter_name) {
    const counter = await this.counterModel.findOne({ _id: counter_name });
    return counter;
  }
  async get_all_counters() {
    const counters = await this.counterModel.find();
    return counters;
  }
  async update_counter(req) {
    const counter = await this.counterModel.findByIdAndUpdate(
      req.params.id,
      { sequence_value: req.body.sequence_value },
      { new: true },
    );
    return counter;
  }
  async delete_counter(counter_name) {
    const counter = await this.counterModel.findByIdAndRemove(counter_name);
    return counter;
  }
  async get_next_sequence_value(counter_name) {
    const counter = await this.counterModel.findByIdAndUpdate(
      counter_name,
      { $inc: { sequence_value: 1 } },
      { new: true },
    );
    return counter.sequence_value;
  }
}