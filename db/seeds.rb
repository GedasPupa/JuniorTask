3.times do |i|
    Record.create(
      Mfr_Name: "Lucid Motors #{i + 1}",
      Mfr_ID: "#{i +1}"
    )
  end