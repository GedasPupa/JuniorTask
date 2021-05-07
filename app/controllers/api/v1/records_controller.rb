class Api::V1::RecordsController < ApplicationController
  def index
    record = Record.all     #.order(created_at: :desc) 
    render json: record
  end

  def create
    record = Record.create!(record_params)
    if record
      render json: record
    else
      render json: record.errors
    end
  end

  def show
    if record
      render json: record
    else
      render json: record.errors
    end
  end

  def edit
    if record
      render json: record
    else
      render json: record.errors
    end  end

  def update
    record = Record.update(record_params)
    if record
      render json: record
    else
      render json: record.errors
    end
  end

  def destroy
    record&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  private
  # def update_params
  #   params.permit(:Mfr_Name)
  # end
  def record_params
    params.permit(:Mfr_Name, :Mfr_ID)
  end
  def record
    @record ||= Record.find(params[:id])
  end

end
