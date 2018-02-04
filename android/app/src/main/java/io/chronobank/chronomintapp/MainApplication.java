package io.chronobank.chronomintapp;

import android.support.annotation.Nullable;
import com.bitgo.randombytes.RandomBytesPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactApplication;
import com.bitgo.randombytes.RandomBytesPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
      // Make sure you are using BuildConfig from your own application
      return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
          new ReactNativeFingerprintScannerPackage(),
          new ReactNativeDocumentPicker(),
          new RNDeviceInfo(),
          new ReactNativeLocalizationPackage(),
          new RandomBytesPackage()
    );
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }

  @Nullable
  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}
