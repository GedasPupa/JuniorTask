class Record < ApplicationRecord
    validates :Mfr_Name, presence: true
    validates :Mfr_ID, presence: true
end
